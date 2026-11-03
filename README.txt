TTC Bruck Pongbot Drill Studio - Bluetooth patch

This patch replaces the existing file:
  src/novaBluetooth.js

How to apply:
1. Open the GitHub repository vujicic42-sudo/TTCBruck-pongbot-drill-studio.
2. Open the src folder and the existing novaBluetooth.js file.
3. Replace the complete file contents with the supplied src/novaBluetooth.js.
4. Commit the change to the main branch.
5. GitHub Actions will build and deploy the GitHub Pages site automatically.
6. Reopen the website in Chrome and reload it (if needed, clear that site's cached data).

This is website source code. It is NOT firmware and must not be uploaded to the robot.
The patch corrects the Nova S Pro BLE advertised-service filter and characteristic UUIDs,
and fixes byte-array flattening when assembling a drill packet.
