const inhaleInput = document.getElementById("inhale-input");
const holdInput = document.getElementById("hold-input");
const exhaleInput = document.getElementById("exhale-input");
const circle = document.getElementById("circle");
const phaseText = document.getElementById("phase-text");
const secondsText = document.getElementById("seconds-text");
const cycleText = document.getElementById("cycle-text");
const guideText = document.getElementById("guide-text");
const startButton = document.getElementById("start-button");
const resetButton = document.getElementById("reset-button");

// timer logic
const phaseNames = ["Inhale", "Hold", "Exhale"];
const phaseGuides = [
  "Breathe in slowly through your nose.",
  "Hold gently. Keep your shoulders loose.",
  "Let the air out slowly through your mouth.",
];

let shownSeconds = null;

let durations = [4, 4, 4];
let phaseIndex = 0;
let phaseLength = 4;
let secondsLeft = 4;
let cycles = 0;
let started = false;
let running = false;
let timerId = null;

function beginPhase() {
  phaseLength = durations[phaseIndex];
  secondsLeft = phaseLength;
}

function goToNextPhase() {
  phaseIndex = phaseIndex + 1;
  if (phaseIndex === phaseNames.length) {
    phaseIndex = 0;
    cycles = cycles + 1;
  }
  beginPhase();
}

function tick() {
  secondsLeft = secondsLeft - 1;
  if (secondsLeft === 0) {
    goToNextPhase();
  }
}

function start() {
  if (!started) {
    started = true;
    phaseIndex = 0;
    cycles = 0;
    beginPhase();
  }
  running = true;
  timerId = setInterval(() => {
    tick();
    showScreen();
  }, 1000);
}

function pause() {
  running = false;
  clearInterval(timerId);
}

function reset() {
  pause();
  started = false;
  phaseIndex = 0;
  cycles = 0;
}


function showScreen() {
  if (started) {
    phaseText.textContent = phaseNames[phaseIndex];
    guideText.textContent = phaseGuides[phaseIndex];
    secondsText.textContent = secondsLeft;
  } else {
    phaseText.textContent = "Ready";
    guideText.textContent = "Set your pace, then press Start.";
    secondsText.textContent = durations[0];
  }

  if (shownSeconds !== secondsText.textContent) {
    shownSeconds = secondsText.textContent;
    secondsText.classList.remove("tick");
    void secondsText.offsetWidth; // restarts the CSS animation
    secondsText.classList.add("tick");
  }
  cycleText.textContent = "Completed cycles: " + cycles;

  if (running) {
    startButton.textContent = "Pause";
  } else if (started) {
    startButton.textContent = "Resume";
  } else {
    startButton.textContent = "Start";
  }

  circle.className = "circle";
  if (started) {
    circle.classList.add(phaseNames[phaseIndex].toLowerCase());
    circle.style.animationDuration = phaseLength + "s";
  }
  if (started && !running) {
    circle.classList.add("paused");
  }
}

//  Inputs and buttons 

function readSeconds(input) {
  let seconds = Math.round(Number(input.value));
  if (isNaN(seconds) || seconds < 1) seconds = 1;
  if (seconds > 30) seconds = 30;
  input.value = seconds;
  return seconds;
}

function readDurations() {
  durations = [
    readSeconds(inhaleInput),
    readSeconds(holdInput),
    readSeconds(exhaleInput),
  ];
}

function toggle() {
  if (running) {
    pause();
  } else {
    start();
  }
  showScreen();
}

[inhaleInput, holdInput, exhaleInput].forEach((input) => {
  input.addEventListener("change", () => {
    readDurations();
    showScreen();
  });
});

startButton.addEventListener("click", toggle);

resetButton.addEventListener("click", () => {
  reset();
  showScreen();
});

document.addEventListener("keydown", (event) => {
  const tag = document.activeElement.tagName;
  if (event.code === "Space" && tag !== "INPUT" && tag !== "BUTTON") {
    event.preventDefault();
    toggle();
  }
});

readDurations();
showScreen();
