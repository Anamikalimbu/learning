const form = document.getElementById("entry-form");
const dateInput = document.getElementById("date");
const moodSelect = document.getElementById("mood");
const noteInput = document.getElementById("note");
const saveButton = document.getElementById("save-button");
const cancelButton = document.getElementById("cancel-button");
const filterButtons = document.querySelectorAll("#filters button");
const list = document.getElementById("entry-list");

const moodNames = { 1: "Very low", 2: "Low", 3: "Okay", 4: "Good", 5: "Great" };

let entries = loadEntries();
let editingId = null;
let currentFilter = "all";
let lastSavedId = null;

function loadEntries() {
  try {
    const saved = JSON.parse(localStorage.getItem("moodEntries"));
    return Array.isArray(saved) ? saved : [];
  } catch (error) {
    return [];
  }
}

function saveEntries() {
  localStorage.setItem("moodEntries", JSON.stringify(entries));
}

function getToday() {
  // "en-CA" gives YYYY-MM-DD in the user's own time zone
  return new Date().toLocaleDateString("en-CA");
}

// "2026-10-16" becomes "Fri 16 Oct 2026"
function formatDate(dateText) {
  const date = new Date(dateText + "T00:00:00");
  if (isNaN(date)) return dateText;
  return date.toLocaleDateString("en-GB", {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function matchesFilter(entry) {
  if (currentFilter === "good") return entry.mood >= 4;
  if (currentFilter === "neutral") return entry.mood === 3;
  if (currentFilter === "low") return entry.mood <= 2;
  return true;
}

function showEntries() {
  const savedId = lastSavedId;
  lastSavedId = null;
  list.innerHTML = "";

  filterButtons.forEach((button) => {
    button.classList.toggle("active", button.dataset.filter === currentFilter);
  });

  const shown = entries
    .filter(matchesFilter)
    .sort((a, b) => b.date.localeCompare(a.date) || b.id - a.id);

  if (shown.length === 0) {
    const message = document.createElement("p");
    message.className = "empty";
    message.textContent =
      entries.length === 0 ? "No entries yet." : "No entries for this filter.";
    list.appendChild(message);
    return;
  }

  shown.forEach((entry) => {
    const card = document.createElement("div");
    card.className = "card mood-card mood-" + entry.mood;
    if (entry.id === savedId) card.classList.add("just-saved");

    const heading = document.createElement("h2");
    heading.textContent = formatDate(entry.date);

    // five bars that fill up to the mood, then the mood in words
    const moodText = document.createElement("p");
    moodText.className = "mood-badge";
    const meter = document.createElement("span");
    meter.className = "meter";
    meter.setAttribute("aria-hidden", "true");
    for (let n = 1; n <= 5; n++) {
      const bar = document.createElement("span");
      if (n <= entry.mood) {
        bar.className = "on";
        bar.style.setProperty("--n", n);
      }
      meter.appendChild(bar);
    }
    const moodWords = document.createElement("span");
    moodWords.className = "mood-text";
    moodWords.textContent =
      "Mood: " + entry.mood + " (" + moodNames[entry.mood] + ")";
    moodText.append(meter, moodWords);

    card.append(heading, moodText);

    if (entry.note !== "") {
      const noteText = document.createElement("p");
      noteText.textContent = entry.note;
      card.appendChild(noteText);
    }

    const buttons = document.createElement("div");
    buttons.className = "buttons";

    const editButton = document.createElement("button");
    editButton.textContent = "Edit";
    editButton.addEventListener("click", () => startEditing(entry));

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.className = "danger";
    deleteButton.addEventListener("click", () => deleteEntry(entry, card));

    buttons.append(editButton, deleteButton);
    card.appendChild(buttons);
    list.appendChild(card);
  });
}

function resetForm() {
  editingId = null;
  form.reset();
  dateInput.value = getToday();
  saveButton.textContent = "Add entry";
  cancelButton.hidden = true;
  form.classList.remove("editing");
}

function startEditing(entry) {
  editingId = entry.id;
  dateInput.value = entry.date;
  moodSelect.value = entry.mood;
  noteInput.value = entry.note;
  saveButton.textContent = "Save changes";
  cancelButton.hidden = false;
  form.classList.add("editing");
  dateInput.focus();
}

function deleteEntry(entry, card) {
  askToConfirm("Delete this entry?").then((confirmed) => {
    if (!confirmed) return;
    foldAway(card, () => {
      entries = entries.filter((item) => item.id !== entry.id);
      saveEntries();
      if (editingId === entry.id) resetForm();
      showEntries();
      showToast("Entry deleted");
    });
  });
}

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const date = dateInput.value;
  const mood = Number(moodSelect.value);
  const note = noteInput.value.trim();

  if (date === "") {
    showToast("Choose a date for this entry.", "error");
    return;
  }

  const wasEditing = editingId !== null;
  if (editingId === null) {
    const newEntry = { id: Date.now(), date: date, mood: mood, note: note };
    entries.push(newEntry);
    lastSavedId = newEntry.id;
  } else {
    const entry = entries.find((item) => item.id === editingId);
    entry.date = date;
    entry.mood = mood;
    entry.note = note;
    lastSavedId = entry.id;
  }

  saveEntries();
  resetForm();
  showEntries();
  showToast(wasEditing ? "Changes saved" : "Entry added");
});

cancelButton.addEventListener("click", resetForm);

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    currentFilter = button.dataset.filter;
    showEntries();
  });
});

resetForm();
showEntries();
