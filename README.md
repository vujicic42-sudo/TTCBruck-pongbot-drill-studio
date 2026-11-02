# Pongbot Team Drill Studio

A static React web app for editing and exporting Pongbot Nova S Pro drill CSV files.

## Publish with GitHub Pages

1. Create a new GitHub repository, for example `pongbot-drill-studio`.
2. Upload all files from this project, including the `.github` directory.
3. In GitHub, open **Settings > Pages**.
4. Under **Build and deployment**, select **GitHub Actions**.
5. Push or commit to the `main` branch.
6. Open **Actions** and wait for `Deploy to GitHub Pages` to complete.
7. The public URL will be shown in the deployment job and under **Settings > Pages**.

## Local development

```bash
npm install
npm run dev
```

## Production build

```bash
npm run build
npm run preview
```

## Data storage

- Current working drills are saved in browser `localStorage`.
- The latest imported CSV is cached separately in browser `localStorage`.
- Imported CSV contents are not uploaded to a server by this app.
- Each browser/device has its own local drill library.

## CSV columns

`Set;Ball;Name;Speed;Spin;Type;Height;Drop;BPM;Reps`

## Version 1.1 Bluetooth controls

- Experimental Web Bluetooth connection and Nova authentication handshake.
- Send and start the selected drill on the robot.
- Pause, resume, stop and 10-second idle keepalive commands.
- Mock robot and Bluetooth diagnostics for tests without hardware.

Use the public HTTPS GitHub Pages URL in Chrome or Microsoft Edge. iOS/iPadOS Safari does not support this Web Bluetooth workflow.

For the first physical test, use an empty hopper, stand clear of the outlet and wheels, and keep the robot power switch or remote within reach.

## Version 1.2

- Failed or cancelled Bluetooth connections now reset cleanly without a page refresh.
- Bluetooth connection, mock robot, diagnostics and log controls moved to the Settings tab.
- Imports now retain the three protected basic drills.
- New Delete imported drills button removes imported/custom drills and the cached last import, while retaining the three basics.
- Header controls have fixed heights to prevent the full-screen stretched-button layout.
