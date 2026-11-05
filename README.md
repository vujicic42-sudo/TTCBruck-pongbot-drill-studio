# TTCBruck Pongbot Drill Studio v1.9

This package was built directly from the ten repository files supplied by the owner.

Only the real-robot duration behavior was changed: Team-session **Send & Start** now passes the selected 1–10 minutes to `NovaBluetooth.start()`. The NEW_DRILL packet uses timed mode (`0x00`) and stores the selected minutes in the existing 16-bit mode-value field. The browser countdown remains a fallback and sends Stop at `00:00`. All other uploaded source files and application behavior remain unchanged.
