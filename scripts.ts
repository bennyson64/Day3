// "https://api.allorigins.win/raw?url=https://zenquotes.io/api/random"

const RANDOM_QUOTE_URL = "https://random-word-api.herokuapp.com/word?number=50";
const quoteDisp = document.getElementById("static-content") as HTMLDivElement;

function getUrl() {
  return fetch(RANDOM_QUOTE_URL)
    .then((response) => response.json())
    .then((data) => data.join(" "));
}

async function getQuote() {
  if (quoteDisp) quoteDisp.innerText = "Loading...";
  try {
    const quote = await getUrl();
    if (quoteDisp) quoteDisp.innerText = quote;
  } catch (error) {
    if(quoteDisp) quoteDisp.innerText = String(error);
    console.error(error);
  }
}
getQuote();
const typingDiv = document.getElementById("elemdisp") as HTMLTextAreaElement;
typingDiv.disabled = true;
const button = document.getElementById("calcBtn") as HTMLButtonElement;
const result = document.getElementById("result") as HTMLButtonElement;
const timerdisplay = document.getElementById("timer") as HTMLTextAreaElement;
const startBtn = document.getElementById("startBtn") as HTMLButtonElement;

let timeLeft = 30;
let timerId:number | null  = null;
let startTime:number | null = null;

startBtn.addEventListener("click", () => {
  if (timerId !== null) return;
  timeLeft = 30;
  timerdisplay.textContent = timeLeft;
  startTime = Date.now();
  console.log(startTime);
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
  const typedText = typingDiv.value;
  const quoteText = quoteDisp.innerText;
  const typedWords = typedText.trim().split(/\s+/);
  const quoteWords = quoteText.trim().split(/\s+/);
  let correctWords = 0;
  for (let i = 0; i < Math.min(typedWords.length, quoteWords.length); i++) {
    if (typedWords[i] === quoteWords[i]) {
      correctWords++;
    }
  }
  const accuracy =
    typedWords.length > 0 ? (correctWords / typedWords.length) * 100 : 0;
  const timeTaken = (Date.now() - startTime) / 1000 / 60;
  const wpm = timeTaken > 0 ? correctWords / timeTaken : 0;
  result.textContent = `Correct words: ${correctWords}/${quoteWords.length}, Accuracy: ${accuracy.toFixed(2)}%, WPM: ${wpm.toFixed(2)}`;
});

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
