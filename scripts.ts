// "https://api.allorigins.win/raw?url=https://zenquotes.io/api/random"

const RANDOM_QUOTE_URL: string =
  "https://random-word-api.herokuapp.com/word?number=50";
const quoteDisp: HTMLDivElement = document.getElementById("static-content",
) as HTMLDivElement;

function getUrl(): Promise<string> {
  return fetch(RANDOM_QUOTE_URL)
    .then((response: Response) => response.json())
    .then((data: string[]) => data.join(" "));
}

async function getQuote(): Promise<void> {
  quoteDisp.innerText = "Loading...";
  try {
    const quote: string = await getUrl();
    quoteDisp.innerText = quote;
  } catch (error: any) {
    quoteDisp.innerText = String(error);
    console.error(error);
  }
}
getQuote();

const typingDiv: HTMLTextAreaElement = document.getElementById(
  "elemdisp",
) as HTMLTextAreaElement;
typingDiv.disabled = true;
const button: HTMLButtonElement = document.getElementById(
  "calcBtn",
) as HTMLButtonElement;
const result: HTMLDivElement = document.getElementById(
  "result",
) as HTMLDivElement;
const timerdisplay: HTMLDivElement = document.getElementById(
  "timer",
) as HTMLDivElement;
const startBtn: HTMLButtonElement = document.getElementById(
  "startBtn",
) as HTMLButtonElement;

let timeLeft: number = 30;
let timerId: number | null = null;
let startTime: number | null = null;

startBtn.addEventListener("click", (): void => {
  if (timerId !== null) return;
  timeLeft = 30;
  timerdisplay.textContent = timeLeft.toString();
  startTime = Date.now();
  console.log(startTime);
  button.disabled = true;
  startBtn.disabled = true;
  typingDiv.disabled = false;
  button.classList.add("disabled-btn");

  document.addEventListener("click", (e: Event): void => {
    if (button.disabled === true) {
      startBtn.classList.add("startBtn");
    }
  });

  timerId = setInterval((): void => {
    if (timeLeft === 0) {
      clearInterval(timerId!);
      timerId = null;
      button.disabled = false;
      startBtn.disabled = false;
      typingDiv.disabled = true;
      button.classList.remove("disabled-btn");
      alert("stop!");
      return;
    }

    timeLeft--;
    timerdisplay.textContent = timeLeft.toString();
  }, 1000);
});

button.addEventListener("click", (): void => {
  const typedText: string = typingDiv.value;
  const quoteText: string = quoteDisp.innerText;
  const typedWords: string[] = typedText.trim().split(/\s+/);
  const quoteWords: string[] = quoteText.trim().split(/\s+/);
  let correctWords: number = 0;
  for (
    let i: number = 0;
    i < Math.min(typedWords.length, quoteWords.length);
    i++
  ) {
    if (typedWords[i] === quoteWords[i]) {
      correctWords++;
    }
  }
  const accuracy: number =
    typedWords.length > 0 ? (correctWords / typedWords.length) * 100 : 0;
  const timeTaken: number = (Date.now() - (startTime || 0)) / 1000 / 60;
  const wpm: number = timeTaken > 0 ? correctWords / timeTaken : 0;
  result.textContent = `Correct words: ${correctWords}/${quoteWords.length}, Accuracy: ${accuracy.toFixed(2)}%, WPM: ${wpm.toFixed(2)}`;
});

const keys: NodeListOf<Element> = document.querySelectorAll(".key");

document.addEventListener("keydown", (e: KeyboardEvent): void => {
  keys.forEach((b: Element): void => {
    if ((b as HTMLElement).textContent?.toLowerCase() === e.key.toLowerCase()) {
      (b as HTMLElement).classList.add("active");
    }
  });
});

document.addEventListener("keyup", (e: KeyboardEvent): void => {
  keys.forEach((b: Element): void => {
    if ((b as HTMLElement).textContent?.toLowerCase() === e.key.toLowerCase()) {
      (b as HTMLElement).classList.remove("active");
    }
  });
});

startBtn.addEventListener("click", (): void => {
  button.disabled = true;
});
