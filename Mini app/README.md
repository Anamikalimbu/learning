# Mini Apps

A small collection of browser-based tools for saving links, tracking content ideas and moods, and following a paced breathing exercise. The apps use plain HTML, CSS, and JavaScript; there is no build step or package installation.

## Run the apps

Serve this folder with any static web server, then open its `index.html` page. For example, in Visual Studio Code you can use the Live Server extension; this workspace is configured to use port `5502`.

The home page links to each app. You can also open an app directly:

- `bookmarks/index.html`
- `breathing-timer/index.html`
- `content-ideas/index.html`
- `mood-journal/index.html`

## Folder guide

| Folder | Purpose |
| --- | --- |
| [`.vscode/`](.vscode/) | Workspace editor settings, including the Live Server port. See [its README](.vscode/README.md). |
| [`bookmarks/`](bookmarks/) | Add, edit, delete, tag, and search saved links. See the [Bookmarks guide](bookmarks/README.md). |
| [`breathing-timer/`](breathing-timer/) | Configure inhale, hold, and exhale durations and follow the animated timer. See the [Breathing Timer guide](breathing-timer/README.md). |
| [`content-ideas/`](content-ideas/) | Track video, blog, and post ideas through draft to published or archived. See the [Content Ideas guide](content-ideas/README.md). |
| [`mood-journal/`](mood-journal/) | Record a daily mood and optional note, then filter past entries. See the [Mood Journal guide](mood-journal/README.md). |

## Shared files

- `index.html` is the landing page and app directory.
- `style.css` provides the shared layout and visual styles.
- `shared.js` contains reusable toast, confirmation-dialog, and delete-animation helpers.

Each app's entries are saved in the browser's local storage on that device and browser. No account or server-side storage is used. The pages load display fonts from Google Fonts when an internet connection is available; system fonts are used as fallbacks.