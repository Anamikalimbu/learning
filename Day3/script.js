const character = document.getElementById("character");
const themeBtn = document.getElementById("themeBtn");

// Day / Night Toggle

themeBtn.addEventListener("click", () => {
  document.body.classList.toggle("night");

  if (document.body.classList.contains("night")) {
    themeBtn.textContent = "🌙 Night Mode";
  } else {
    themeBtn.textContent = "☀️ Day Mode";
  }
});

// Wave Animation

character.addEventListener("click", () => {
  character.classList.add("wave");

  setTimeout(() => {
    character.classList.remove("wave");
  }, 3000);
});

// Mouse Rotation

document.addEventListener("mousemove", (e) => {
  const x = (e.clientX / window.innerWidth - 0.5) * 30;
  const y = (e.clientY / window.innerHeight - 0.5) * -20;

  character.style.transform = `rotateY(${x}deg) rotateX(${y}deg)`;
});

// Return to Center

document.addEventListener("mouseleave", () => {
  character.style.transform = "rotateY(0deg) rotateX(0deg)";
});

// Double Click Jump

character.addEventListener("dblclick", () => {
  character.animate(
    [
      {
        transform: character.style.transform + " translateY(0px)",
      },
      {
        transform: character.style.transform + " translateY(-40px)",
      },
      {
        transform: character.style.transform + " translateY(0px)",
      },
    ],
    {
      duration: 600,
      easing: "ease-out",
    },
  );
});

// Idle Smile

const mouth = document.querySelector(".mouth");

setInterval(() => {
  mouth.style.height = "12px";

  setTimeout(() => {
    mouth.style.height = "8px";
  }, 400);
}, 4000);

// Floating Effect

let angle = 0;

function animate() {
  angle += 0.02;

  const offset = Math.sin(angle) * 2;

  character.style.marginTop = `${offset}px`;

  requestAnimationFrame(animate);
}

animate();
