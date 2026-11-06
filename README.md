# TTCBruck Pongbot Drill Studio STAGE v1.11

Counter-mode sequence fix based on STAGE v1.10.

In Ball count mode every drill row is sent with `reps = 1`; the Nova combination-count field repeats the complete sequence. A two-ball drill with target 10 is sent as five cycles, producing A-B-A-B-A-B-A-B-A-B instead of five A balls followed by five B balls.

To protect sequence integrity, targets that are not divisible by the number of balls in the drill are rounded upward to the next complete cycle. Example: a three-ball drill with target 50 plays 51 balls (17 complete cycles). The UI shows the effective ball total before Send & Start.
