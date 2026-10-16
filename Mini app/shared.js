const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

function showToast(message, kind) {
  let stack = document.querySelector(".toast-stack");
  if (!stack) {
    stack = document.createElement("div");
    stack.className = "toast-stack";
    stack.setAttribute("role", "status");
    stack.setAttribute("aria-live", "polite");
    document.body.appendChild(stack);
  }

  const toast = document.createElement("div");
  toast.className = kind === "error" ? "toast error" : "toast";
  toast.textContent = message;
  stack.appendChild(toast);

  setTimeout(() => {
    toast.classList.add("going");
    setTimeout(() => toast.remove(), 300);
  }, 2600);
}

function askToConfirm(message, confirmLabel) {
  return new Promise((resolve) => {
    const dialog = document.createElement("dialog");
    dialog.className = "confirm-dialog";

    const form = document.createElement("form");
    form.method = "dialog";
    form.style.cssText =
      "margin:0;padding:0;background:none;border:0;box-shadow:none;backdrop-filter:none";

    const text = document.createElement("p");
    text.textContent = message;

    const buttons = document.createElement("div");
    buttons.className = "dialog-buttons";

    const cancelButton = document.createElement("button");
    cancelButton.type = "submit";
    cancelButton.value = "cancel";
    cancelButton.textContent = "Cancel";

    const confirmButton = document.createElement("button");
    confirmButton.type = "submit";
    confirmButton.value = "confirm";
    confirmButton.className = "danger-solid";
    confirmButton.textContent = confirmLabel || "Delete";

    buttons.append(cancelButton, confirmButton);
    form.append(text, buttons);
    dialog.appendChild(form);
    document.body.appendChild(dialog);

    dialog.addEventListener("close", () => {
      resolve(dialog.returnValue === "confirm");
      dialog.remove();
    });

    dialog.addEventListener("click", (event) => {
      if (event.target === dialog) dialog.close("cancel");
    });

    dialog.showModal();
    cancelButton.focus();
  });
}

function foldAway(card, done) {
  if (!card || reducedMotion.matches) {
    done();
    return;
  }

  let finished = false;
  const finish = () => {
    if (finished) return;
    finished = true;
    done();
  };

  card.style.height = card.offsetHeight + "px";
  card.classList.add("leaving");
  card.addEventListener("animationend", finish, { once: true });
  setTimeout(finish, 600);
}
