import SparkMD5 from 'spark-md5';

// UUIDs match the Nova S Pro GATT service used by Olanga's Nova Drill Control.
const SERVICE = '02f00000-0000-0000-0000-00000000fe00';
const WRITE = '02f00000-0000-0000-0000-00000000ff01';
const NOTIFY = '02f00000-0000-0000-0000-00000000ff02';

// The robot advertises 0xFEFF. The custom GATT service is requested separately.
const ADVERTISED_SERVICE = 0xfeff;

const SALT = 'Mjgx1jAwXDBaMFcxCz3JBgNVBAYT4kJF7Rkw';
const enc = new TextEncoder();
const dec = new TextDecoder();

const bytes = (...values) => new Uint8Array(values.flatMap(value => value instanceof Uint8Array ? Array.from(value) : Array.isArray(value) ? value.flat(Infinity) : [value]));
const hex = data => [...data].map(value => value.toString(16).padStart(2, '0')).join(' ');
const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

export class NovaBluetooth {
  constructor(callback = () => {}) {
    this.cb = callback;
    this.waiters = [];
    this.authenticated = false;
    this.mock = false;
  }

  supported() {
    return !!navigator.bluetooth && window.isSecureContext;
  }

  emit(type, message) {
    this.cb({ time: new Date().toISOString(), type, message });
  }

  async connect({ mock = false } = {}) {
    if (mock) {
      this.mock = this.authenticated = true;
      this.emit('connected', 'Mock Nova connected');
      return { name: 'Mock Nova S Pro', mock: true };
    }

    if (!this.supported()) {
      throw new Error('Web Bluetooth requires Chrome or Edge on HTTPS/localhost.');
    }

    // Match Olanga's device-discovery pattern:
    // filter by the advertised 16-bit UUID, then request access to the GATT service.
    this.device = await navigator.bluetooth.requestDevice({
      filters: [{ services: [ADVERTISED_SERVICE] }],
      optionalServices: [SERVICE]
    });

    this.device.addEventListener('gattserverdisconnected', () => this.disconnected());

    const server = await this.device.gatt.connect();
    const service = await server.getPrimaryService(SERVICE);

    this.w = await service.getCharacteristic(WRITE);
    this.n = await service.getCharacteristic(NOTIFY);

    await this.n.startNotifications();
    this.n.addEventListener('characteristicvaluechanged', event => {
      this.notification(new Uint8Array(event.target.value.buffer));
    });

    await this.auth();

    this.keep = setInterval(() => {
      if (this.authenticated && !this.mock) {
        this.write(bytes(0x83, 6, 0)).catch(() => {});
      }
    }, 10000);

    this.emit('connected', `Authenticated with ${this.device.name || 'Nova S Pro'}`);
    return { name: this.device.name || 'Nova S Pro', mock: false };
  }

  notification(data) {
    this.emit('rx', hex(data));
    this.waiters.shift()?.resolve(data);
  }

  wait(ms = 8000) {
    return new Promise((resolve, reject) => {
      const waiter = {
        resolve: data => {
          clearTimeout(timer);
          resolve(data);
        }
      };

      const timer = setTimeout(() => {
        this.waiters = this.waiters.filter(item => item !== waiter);
        reject(new Error('Robot notification timeout'));
      }, ms);

      this.waiters.push(waiter);
    });
  }

  async write(data) {
    this.emit('tx', hex(data));

    if (this.mock) {
      return sleep(50);
    }

    if (!this.w) {
      throw new Error('Robot is not connected');
    }

    await this.w.writeValue(data);
  }

  async step(data) {
    await this.write(data);
    return this.wait();
  }

  async auth() {
    const response = await this.step(bytes(7, 0, 0, 0));

    if (response.length < 19) {
      throw new Error('Authentication response too short');
    }

    const serial = dec.decode(response.slice(6, 18)).replace(/\0/g, '');
    const code = dec.decode(response.slice(18)).replace(/\0/g, '');
    const salted = [...serial]
      .map(character => SALT[character.charCodeAt(0) % 36])
      .join('');
    const digest = SparkMD5.hash(serial + salted + code);

    await this.step(bytes(8, 32, 0, ...enc.encode(digest)));
    await this.step(bytes(1, 0, 0));
    await this.step(bytes(2, 0, 0));
    await this.step(bytes(0x80, 1, 0, 0));

    this.authenticated = true;
  }

  rpm(ball) {
    const spin = (ball.type === 'back' ? -1 : 1) * Math.abs(+ball.spin);

    return [
      Math.max(400, Math.min(7500, Math.round(970 + 630.5 * +ball.speed + 342 * spin))),
      Math.max(400, Math.min(7500, Math.round(970 + 630.5 * +ball.speed - 342 * spin)))
    ];
  }

  pack(ball) {
    const buffer = new ArrayBuffer(24);
    const view = new DataView(buffer);
    const [topRpm, bottomRpm] = this.rpm(ball);

    view.setUint32(0, topRpm, true);
    view.setUint32(4, bottomRpm, true);
    view.setFloat32(8, (+ball.height + 50) / 150 * 50 - 20, true);
    view.setFloat32(12, (+ball.drop + 10) / 20 * 44 - 22, true);
    view.setFloat32(16, +ball.bpm / 100 + 0.5, true);
    view.setUint32(20, +ball.reps || 1, true);

    return new Uint8Array(buffer);
  }

  packet(drill) {
    if (!drill?.balls?.length) {
      throw new Error('No balls');
    }

    if (drill.balls.length > 20) {
      throw new Error('Maximum 20 balls');
    }

    const payload = drill.balls.flatMap(ball => [...this.pack(ball)]);
    return bytes(0x81, 4 + payload.length, drill.level === 'ANF' ? 0 : 2, 3, 0, 0, 0, payload);
  }

  async start(drill) {
    if (!this.authenticated) {
      throw new Error('Connect robot first');
    }

    await this.write(this.packet(drill));
    this.emit('started', `Started ${drill.name}`);
  }

  control(command, eventName) {
    return this.write(bytes(0x80, 1, 0, command))
      .then(() => this.emit(eventName, eventName));
  }

  pause() {
    return this.control(2, 'paused');
  }

  resume() {
    return this.control(3, 'resumed');
  }

  stop() {
    return this.control(1, 'stopped');
  }

  disconnected() {
    clearInterval(this.keep);
    this.authenticated = this.mock = false;
    this.w = this.n = null;
    this.emit('disconnected', 'Robot disconnected');
  }

  async reset() {
    clearInterval(this.keep);
    this.waiters = [];
    this.authenticated = this.mock = false;

    try {
      if (this.device?.gatt?.connected) {
        this.device.gatt.disconnect();
      }
    } catch {}

    this.device = this.w = this.n = null;
  }
}
