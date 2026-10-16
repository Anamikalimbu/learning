# Breathing Timer

A visual breathing exercise timer with adjustable inhale, hold, and exhale phases.

## What it does

- Set each phase from 1 to 30 seconds (defaults to 4 seconds each).
- Start, pause, resume, or reset the breathing cycle.
- Follow the animated circle and on-screen instructions for each phase.
- See the number of completed cycles. Press **Space** to start, pause, or resume when focus is not in an input or button.

## Files

- `index.html` contains the duration controls, timer display, and buttons.
- `script.js` manages the phase sequence, countdown, controls, and keyboard shortcut.
- `style.css` contains the breathing circle animation and timer-specific styling.
- The shared styles and UI helpers are in the parent folder's `style.css` and `shared.js`.

The timer runs in the current page and does not save settings or history. Animations respect the device's reduced-motion preference.
