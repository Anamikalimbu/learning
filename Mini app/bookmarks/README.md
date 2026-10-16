# Bookmarks

A small bookmark manager for saving links in the browser.

## What it does

- Add a bookmark with a title, URL, and optional comma-separated tags.
- Search bookmarks by title, URL, or tag. Press `/` to focus the search field.
- Edit or delete saved bookmarks.
- Open a bookmark in a new tab.

Use **Add bookmark** to create an entry. Choose **Edit** on a saved item to change it; press **Escape** or choose **Cancel** to leave editing. Deletions ask for confirmation.

## Files

- `index.html` contains the form and bookmark list.
- `script.js` handles bookmark creation, editing, searching, and deletion.
- The shared styles and UI helpers are in the parent folder's `style.css` and `shared.js`.

Bookmarks are stored in this browser's local storage under `bookmarks`. They are not synced to other browsers or devices.
