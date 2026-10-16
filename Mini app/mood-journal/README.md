# Mood Journal

A simple daily journal for recording a mood on a five-point scale and an optional note.

## What it does

- Add an entry for a chosen date, with a mood from Very low (1) to Great (5).
- Include an optional note.
- Browse entries in date order and filter them into Good, Neutral, and Low groups.
- Edit or delete existing entries.

The journal allows more than one entry for a date. The date field defaults to today.

## Files

- `index.html` contains the entry form, mood filters, and entry list.
- `script.js` handles entries, date display, filtering, and deletion.
- The shared styles and UI helpers are in the parent folder's `style.css` and `shared.js`.

Entries are stored in this browser's local storage under `moodEntries`. They are not synced to other browsers or devices.
