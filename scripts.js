// document.addEventListener("keydown", handleKey);
// function handleKey(e) {
//   const elemdisp = document.getElementById("elemdisp");
//   elemdisp.append(e.key);
// }
const typingDiv = document.getElementById("elemdisp");
const button = document.getElementById("calcBtn");
const result = document.getElementById("result");
const timerdisplay = document.getElementById("timer");
const startBtn = document.getElementById("startBtn");

let timeLeft = 30;
let timerId = null;

startBtn.addEventListener("click", () => {
  if (timerId !== null) return;
  timeLeft = 30;
  timerdisplay.textContent = timeLeft;

  timerId = setInterval(() => {
    if (timeLeft === 0) {
      clearInterval(timerId);
      timerId = null;
      alert("stop!");
      return;
    }

    timeLeft--; 
    timerdisplay.textContent = timeLeft;
  }, 1000);
});

button.addEventListener("click", () => {
  const text = typingDiv.textContent;
  const size = text.length;

  const wpm = size / 5;

  result.textContent = wpm;
  alert("Your WPM is:" + wpm);
});

// function calculateWPM() {
//   const text = typingDiv.textContent;
//   const chars = text.length;

//   const minutes = 30 / 60;
//   const wpm = (chars / 5) / minutes;

//   result.textContent = "WPM: " + Math.round(wpm);
// }

const keys = document.querySelectorAll(".key");

document.addEventListener("keydown", (e) => {
  keys.forEach((b) => {
    if (b.textContent.toLowerCase() === e.key.toLowerCase()) {
      b.classList.add("active");
    }
  });
});

document.addEventListener("keyup", (e) => {
  keys.forEach((b) => {
    if (b.textContent.toLowerCase() === e.key.toLowerCase()) {
      b.classList.remove("active");
    }
  });
});
