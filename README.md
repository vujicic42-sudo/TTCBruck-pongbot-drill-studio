# TTC Bruck Pongbot Drill Studio v1.3

Bilingual English/German GitHub Pages app for editing Pongbot Nova S Pro drills and experimental Web Bluetooth control.

## Deploy
Upload all files to the repository root. In Settings > Pages, select GitHub Actions. Commit to `main`.

## Language
Use the ENG / GER selector in the header. The selection is stored in browser localStorage and restored on the next visit.

## Version 1.4 local drill assistant

The new Drill Assistant/Übungsassistent parses German or English descriptions locally in the browser. It recognizes ANF/ADV/PROF levels, Drive, Push, Loop UNT and Loop OB, RH/FH, left/centre/right placement, BPM and simple repetition counts. The proposal becomes a normal editable drill using the tested robot presets. No AI API, account, network request or usage cost is involved. Every generated proposal must be reviewed before sending it to the robot.
