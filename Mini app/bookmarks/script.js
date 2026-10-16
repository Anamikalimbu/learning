const form = document.getElementById("bookmark-form");
const titleInput = document.getElementById("title");
const urlInput = document.getElementById("url");
const tagsInput = document.getElementById("tags");
const saveButton = document.getElementById("save-button");
const cancelButton = document.getElementById("cancel-button");
const searchInput = document.getElementById("search");
const list = document.getElementById("bookmark-list");

let bookmarks = loadBookmarks();
let editingId = null;
let lastSavedId = null;

function loadBookmarks() {
  try {
    const saved = JSON.parse(localStorage.getItem("bookmarks"));
    return Array.isArray(saved) ? saved : [];
  } catch (error) {
    return [];
  }
}

function saveBookmarks() {
  localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
}

function getTags() {
  return tagsInput.value
    .split(",")
    .map((tag) => tag.trim().toLowerCase())
    .filter((tag) => tag !== "");
}

function showBookmarks() {
  const savedId = lastSavedId;
  lastSavedId = null;
  const searchText = searchInput.value.trim().toLowerCase();
  list.innerHTML = "";

  const matches = bookmarks.filter((bookmark) => {
    const text =
      bookmark.title + " " + bookmark.url + " " + bookmark.tags.join(" ");
    return text.toLowerCase().includes(searchText);
  });

  if (matches.length === 0) {
    const message = document.createElement("p");
    message.className = "empty";
    message.textContent =
      bookmarks.length === 0
        ? "No bookmarks yet."
        : "No bookmarks match your search.";
    list.appendChild(message);
    return;
  }

  matches.forEach((bookmark) => {
    const card = document.createElement("div");
    card.className = "card has-tile";
    if (bookmark.id === savedId) card.classList.add("just-saved");

    // a small tile with the first letter of the title
    const tile = document.createElement("div");
    tile.className = "tile";
    tile.setAttribute("aria-hidden", "true");
    tile.textContent = bookmark.title.charAt(0).toUpperCase();

    const body = document.createElement("div");
    body.className = "card-body";

    const heading = document.createElement("h2");
    const link = document.createElement("a");
    link.href = bookmark.url;
    link.textContent = bookmark.title;
    link.target = "_blank";
    link.rel = "noopener";
    heading.appendChild(link);

    const urlText = document.createElement("p");
    urlText.className = "muted-line";
    urlText.textContent = bookmark.url;

    const tagLine = document.createElement("p");
    bookmark.tags.forEach((tag) => {
      const tagSpan = document.createElement("span");
      tagSpan.className = "tag";
      tagSpan.textContent = tag;
      tagLine.appendChild(tagSpan);
    });

    const buttons = document.createElement("div");
    buttons.className = "buttons";

    const editButton = document.createElement("button");
    editButton.textContent = "Edit";
    editButton.addEventListener("click", () => startEditing(bookmark));

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.className = "danger";
    deleteButton.addEventListener("click", () =>
      deleteBookmark(bookmark, card),
    );

    buttons.append(editButton, deleteButton);
    body.append(heading, urlText, tagLine, buttons);
    card.append(tile, body);
    list.appendChild(card);
  });
}

function startEditing(bookmark) {
  editingId = bookmark.id;
  titleInput.value = bookmark.title;
  urlInput.value = bookmark.url;
  tagsInput.value = bookmark.tags.join(", ");
  saveButton.textContent = "Save changes";
  cancelButton.hidden = false;
  form.classList.add("editing");
  titleInput.focus();
}

function stopEditing() {
  editingId = null;
  form.reset();
  saveButton.textContent = "Add bookmark";
  cancelButton.hidden = true;
  form.classList.remove("editing");
  showBookmarks();
}

function deleteBookmark(bookmark, card) {
  askToConfirm("Delete this bookmark?").then((confirmed) => {
    if (!confirmed) return;
    foldAway(card, () => {
      bookmarks = bookmarks.filter((item) => item.id !== bookmark.id);
      saveBookmarks();
      if (editingId === bookmark.id) {
        stopEditing();
      } else {
        showBookmarks();
      }
      showToast("Bookmark deleted");
    });
  });
}

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const title = titleInput.value.trim();
  const url = urlInput.value.trim();

  if (title === "") {
    showToast("Enter a title for the bookmark.", "error");
    return;
  }
  if (!url.startsWith("http://") && !url.startsWith("https://")) {
    showToast("The URL must start with http:// or https://", "error");
    return;
  }

  const wasEditing = editingId !== null;
  if (editingId === null) {
    const newBookmark = {
      id: Date.now(),
      title: title,
      url: url,
      tags: getTags(),
    };
    bookmarks.unshift(newBookmark);
    lastSavedId = newBookmark.id;
  } else {
    const bookmark = bookmarks.find((item) => item.id === editingId);
    bookmark.title = title;
    bookmark.url = url;
    bookmark.tags = getTags();
    lastSavedId = bookmark.id;
  }

  saveBookmarks();
  stopEditing();
  showToast(wasEditing ? "Changes saved" : "Bookmark added");
});

cancelButton.addEventListener("click", stopEditing);
searchInput.addEventListener("input", showBookmarks);

document.addEventListener("keydown", (event) => {
  const typing = ["INPUT", "TEXTAREA"].includes(document.activeElement.tagName);

  if (event.ctrlKey && event.key === "Enter") {
    event.preventDefault();
    form.requestSubmit();
  } else if (event.key === "Escape" && editingId !== null) {
    stopEditing();
  } else if (event.key === "/" && !typing) {
    event.preventDefault();
    searchInput.focus();
  }
});

showBookmarks();
