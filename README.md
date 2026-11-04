# TTCBruck Pongbot Drill Studio v1.6
Complete ENG/GER Vite/React project. Preserves CSV import/export, browser cache, level filter, editor, drill timer, local assistant, mock/real Bluetooth controls, diagnostics, and protected basics. UI terminology is localized while internal CSV and robot values remain unchanged.

## Version 1.7
- Yellow active ENG/GER language button.
- Localized editor labels for speed, spin, height, drop and BPM.
- Reps remains internally available for CSV/robot communication but is hidden from the editor.
- Restored drill preview without requiring Bluetooth.
- Timer now uses a 1–10 minute selector.
- Restored Bluetooth Disconnect and removed Mock robot.

## Version 1.8
- Active ENG/GER, level, tab and selected-drill buttons use the Export CSV green.
- Drill library uses its own scrollable area.
- Last imported CSV card again shows filename, timestamp and Restore last import.
- Overview shows localized placement plus numeric Drop.
- Display-only hand labels: GER FH -> VH; ENG RH -> BH. Internal RH/FH and CSV remain unchanged.
- Drill preview no longer starts or changes the timer.
- Timer starts only with Send & Start on robot.
