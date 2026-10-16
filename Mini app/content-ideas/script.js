const form = document.getElementById("idea-form");
const titleInput = document.getElementById("title");
const typeSelect = document.getElementById("type");
const statusSelect = document.getElementById("status");
const saveButton = document.getElementById("save-button");
const cancelButton = document.getElementById("cancel-button");
const typeFilter = document.getElementById("type-filter");
const statusFilter = document.getElementById("status-filter");
const list = document.getElementById("idea-list");

const typeSymbols = { Video: "\u25B6", Blog: "\u270E", Post: "\u2726" };

let ideas = loadIdeas();
let editingId = null;
let lastSavedId = null;

function loadIdeas() {
  try {
    const saved = JSON.parse(localStorage.getItem("contentIdeas"));
    return Array.isArray(saved) ? saved : [];
  } catch (error) {
    return [];
  }
}

function saveIdeas() {
  localStorage.setItem("contentIdeas", JSON.stringify(ideas));
}

function showIdeas() {
  const savedId = lastSavedId;
  lastSavedId = null;
  list.innerHTML = "";

  const matches = ideas.filter((idea) => {
    const typeOk = typeFilter.value === "all" || idea.type === typeFilter.value;
    const statusOk =
      statusFilter.value === "all" || idea.status === statusFilter.value;
    return typeOk && statusOk;
  });

  if (matches.length === 0) {
    const message = document.createElement("p");
    message.className = "empty";
    message.textContent =
      ideas.length === 0 ? "No ideas yet." : "No ideas match these filters.";
    list.appendChild(message);
    return;
  }

  matches.forEach((idea) => {
    const card = document.createElement("div");
    card.className = "card has-tile";
    if (idea.id === savedId) card.classList.add("just-saved");

    // the tile shows what kind of idea it is
    const tile = document.createElement("div");
    tile.className = "tile";
    tile.setAttribute("aria-hidden", "true");
    tile.textContent = typeSymbols[idea.type] || "+";

    const body = document.createElement("div");
    body.className = "card-body";

    const heading = document.createElement("h2");
    heading.textContent = idea.title;

    const details = document.createElement("p");
    const typeTag = document.createElement("span");
    typeTag.className = "tag";
    typeTag.textContent = idea.type;
    const statusTag = document.createElement("span");
    statusTag.className = "tag " + idea.status.toLowerCase();
    statusTag.textContent = idea.status;
    details.append(typeTag, statusTag);

    const buttons = document.createElement("div");
    buttons.className = "buttons";

    const editButton = document.createElement("button");
    editButton.textContent = "Edit";
    editButton.addEventListener("click", () => startEditing(idea));

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.className = "danger";
    deleteButton.addEventListener("click", () => deleteIdea(idea, card));

    buttons.append(editButton, deleteButton);
    body.append(heading, details, buttons);
    card.append(tile, body);
    list.appendChild(card);
  });
}

function stopEditing() {
  editingId = null;
  form.reset();
  saveButton.textContent = "Add idea";
  cancelButton.hidden = true;
  form.classList.remove("editing");
}

function startEditing(idea) {
  editingId = idea.id;
  titleInput.value = idea.title;
  typeSelect.value = idea.type;
  statusSelect.value = idea.status;
  saveButton.textContent = "Save changes";
  cancelButton.hidden = false;
  form.classList.add("editing");
  titleInput.focus();
}

function deleteIdea(idea, card) {
  askToConfirm("Delete this idea?").then((confirmed) => {
    if (!confirmed) return;
    foldAway(card, () => {
      ideas = ideas.filter((item) => item.id !== idea.id);
      saveIdeas();
      if (editingId === idea.id) stopEditing();
      showIdeas();
      showToast("Idea deleted");
    });
  });
}

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const title = titleInput.value.trim();
  if (title === "") {
    showToast("Describe your idea first.", "error");
    return;
  }

  const wasEditing = editingId !== null;
  if (editingId === null) {
    const newIdea = {
      id: Date.now(),
      title: title,
      type: typeSelect.value,
      status: statusSelect.value,
    };
    ideas.unshift(newIdea);
    lastSavedId = newIdea.id;
  } else {
    const idea = ideas.find((item) => item.id === editingId);
    idea.title = title;
    idea.type = typeSelect.value;
    idea.status = statusSelect.value;
    lastSavedId = idea.id;
  }

  saveIdeas();
  stopEditing();
  showIdeas();
  showToast(wasEditing ? "Changes saved" : "Idea added");
});

cancelButton.addEventListener("click", stopEditing);
typeFilter.addEventListener("change", showIdeas);
statusFilter.addEventListener("change", showIdeas);

// keyboard shortcuts, same as Bookmarks: Ctrl+Enter saves, Escape cancels an edit
document.addEventListener("keydown", (event) => {
  if (document.querySelector("dialog[open]")) return; // leave the confirm dialog alone

  if ((event.ctrlKey || event.metaKey) && event.key === "Enter") {
    event.preventDefault();
    form.requestSubmit();
  } else if (event.key === "Escape" && editingId !== null) {
    stopEditing();
  }
});

showIdeas();
