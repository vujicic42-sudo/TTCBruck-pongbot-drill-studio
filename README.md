# TTC Bruck Pongbot Drill Studio v1.6

Bilingual English/German GitHub Pages app for editing Pongbot Nova S Pro drills and experimental Web Bluetooth control.

## Deploy
Upload all files to the repository root. In Settings > Pages, select GitHub Actions. Commit to `main`.

## Language
Use the ENG / GER selector in the header. The selection is stored in browser localStorage and restored on the next visit.

## Version 1.4 local drill assistant

The new Drill Assistant/Übungsassistent parses German or English descriptions locally in the browser. It recognizes ANF/ADV/PROF levels, Drive, Push, Loop UNT and Loop OB, RH/FH, left/centre/right placement, BPM and simple repetition counts. The proposal becomes a normal editable drill using the tested robot presets. No AI API, account, network request or usage cost is involved. Every generated proposal must be reviewed before sending it to the robot.

## Timed training sessions

The Team Session tab supports a maximum duration from 1 to 60 minutes (5 minutes by default). The selected drill is sent to the Nova S Pro. When the robot reports that the current drill batch has completed (`00 02 03 00 05 01 00`), the app sends the same drill again while the session timer is still running. The session stops when the timer reaches zero, or when the user presses Stop / Hopper empty – stop. Pause and Resume pause or restart the session timer as well as the robot.

**Hopper-empty limitation:** The Nova notification protocol used by this project exposes the drill-batch-complete message, but no verified hopper-empty sensor message. Therefore the app cannot reliably detect an empty ball hopper automatically; press **Hopper empty – stop** when the hopper is empty. The timer is a maximum duration, not a guaranteed hopper sensor.


## Stroke style names (v1.6)

The interface and exported/imported drill names use these labels:
- Push -> US/Schupf
- Drive -> Konter
- Loop UNT -> Topspin US
- Loop OB -> Block/GG-Topspin

Internal robot style identifiers and Bluetooth command handling remain unchanged for compatibility. The local drill assistant accepts both the previous names and the new labels.
