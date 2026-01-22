// "https://api.allorigins.win/raw?url=https://zenquotes.io/api/random"

const RANDOM_QUOTE_URL = "https://random-word-api.herokuapp.com/word?number=50";
const quoteDisp = document.getElementById("static-content");

function getUrl() {
    return fetch(RANDOM_QUOTE_URL)
      .then((response) => response.json())
      .then((data) => data.join(" "));

}

async function getQuote() {
  quoteDisp.innerText = "Loading...";
  try {
    const quote = await getUrl();
    quoteDisp.innerText = quote;
  } catch (error) {
    quoteDisp.innerText = (error);
    console.error(error);
  } 
}
getQuote();
const typingDiv = document.getElementById("elemdisp");
typingDiv.disabled = true;
const button = document.getElementById("calcBtn");
const result = document.getElementById("result");
const timerdisplay = document.getElementById("timer");
const startBtn = document.getElementById("startBtn");

let timeLeft = 30;
let timerId = null;
let startTime = null;

startBtn.addEventListener("click", () => {
  if (timerId !== null) return;
  timeLeft = 30;
  timerdisplay.textContent = timeLeft;
  startTime = Date.now();
  button.disabled = true;
  startBtn.disabled = true;
  typingDiv.disabled = false;
  calcBtn.classList.add("disabled-btn");

  document.addEventListener("click", (e) => {
    if (button.disabled == true) {
      classList.add("startBtn");
    }
  });

  timerId = setInterval(() => {
    if (timeLeft === 0) {
      clearInterval(timerId);
      timerId = null;
      button.disabled = false;
      startBtn.disabled = false;
      typingDiv.disabled = true;
      calcBtn.classList.remove("disabled-btn");
      alert("stop!");
      return;
    }

    timeLeft--;
    timerdisplay.textContent = timeLeft;
  }, 1000);
});

button.addEventListener("click", () => {
  // const text = typingDiv.value;
  // const size = text.length;

  // const wpm = size / 5;

  // result.textContent = wpm;
  // alert("Your WPM is:" + wpm);
  const typedText = typingDiv.value;
  const quoteText = quoteDisp.innerText;
  const typedWords = typedText.trim().split(/\s+/);
  const quoteWords = quoteText.trim().split(/\s+/);
  let correctWords = 0;
  for (let i = 0; i < Math.min(typedWords.length, quoteWords.length); i++) {
    if (typedWords[i] === quoteWords[i]) correctWords++;
  }
  const accuracy =
    typedWords.length > 0 ? (correctWords / typedWords.length) * 100 : 0;
  const timeTaken = (Date.now() - startTime) / 1000 / 60; // minutes
  const wpm = timeTaken > 0 ? correctWords / timeTaken : 0;
  result.textContent = `Correct words: ${correctWords}/${quoteWords.length}, Accuracy: ${accuracy.toFixed(2)}%, WPM: ${wpm.toFixed(2)}`;
  // alert(`Your WPM: ${wpm.toFixed(2)}, Accuracy: ${accuracy.toFixed(2)}%`);
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

startBtn.addEventListener("click", () => {
  calcBtn.disabled = true;
});


// async function hi(){
//   let hello = await fetch("api-url.com"); 
// }