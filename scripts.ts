// "https://api.allorigins.win/raw?url=https://zenquotes.io/api/random"

const RANDOM_QUOTE_URL: string =
  "https://random-word-api.herokuapp.com/word?number=1";
const quoteDisp: HTMLDivElement = document.getElementById(
  "static-content",
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
const timerdisplay: HTMLDivElement = document.getElementById(
  "timer",
) as HTMLDivElement;
const startBtn: HTMLButtonElement = document.getElementById(
  "startBtn",
) as HTMLButtonElement;
const resultModal: HTMLDivElement = document.getElementById(
  "resultModal",
) as HTMLDivElement;
const closeModalBtn: HTMLButtonElement = document.getElementById(
  "closeModalBtn",
) as HTMLButtonElement;
const closeModal: HTMLButtonElement = document.getElementById(
  "closeModal",
) as HTMLButtonElement;

let timeLeft: number = 30;
let timerId: number | null = null;
let startTime: number | null = null;
let quoteWords: string[] = [];
let currentWordIndex: number = 0;
let totalCorrectWords: number = 0;
let totalWordsAttemptedCount: number = 0;
let wordCounted: boolean = false;

// Load new words from API
async function loadNewWords(): Promise<void> {
  try {
    const newQuote: string = await getUrl();
    quoteWords = newQuote.trim().split(/\s+/);
    currentWordIndex = 0;
    quoteDisp.innerText = quoteWords.join(" ");
  } catch (error) {
    console.error("Failed to load new words:", error);
  }
}

// Initialize with first set of words
loadNewWords();

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
  const timeTaken: number = (Date.now() - (startTime || 0)) / 1000 / 60;
  const wpm: number = timeTaken > 0 ? totalCorrectWords / timeTaken : 0;
  const totalWordsAttempted: number =
    currentWordIndex > 0 ? currentWordIndex : 1;
  const accuracy: number = (totalCorrectWords / totalWordsAttempted) * 100;

  // Update modal with results
  (document.getElementById("modalWpm") as HTMLDivElement).textContent =
    wpm.toFixed(2);
  (document.getElementById("modalCorrectWords") as HTMLDivElement).textContent =
    totalCorrectWords.toString();
  (document.getElementById("modalAccuracy") as HTMLDivElement).textContent =
    accuracy.toFixed(2) + "%";

  // Show modal
  resultModal.classList.remove("hidden");
});

const keys: NodeListOf<Element> = document.querySelectorAll(".key");

// Real-time word checking - character by character
typingDiv.addEventListener("input", (): void => {
  const currentInput: string = typingDiv.value;
  const expectedWord: string = quoteWords[currentWordIndex] || "";

  if (currentInput === "") {
    typingDiv.style.backgroundColor = "";
    typingDiv.style.color = "";
    wordCounted = false;
    return;
  }

  // Compare character by character
  let isCorrect: boolean = true;
  for (let i = 0; i < currentInput.length; i++) {
    if (currentInput[i] !== expectedWord[i]) {
      isCorrect = false;
      break;
    }
  }

  // Check if word is complete
  if (currentInput.length === expectedWord.length) {
    totalWordsAttemptedCount++;
    if (isCorrect && !wordCounted) {
      // Correct word - all letters match (only count once)
      typingDiv.style.backgroundColor = "#dcfce7";
      typingDiv.style.color = "#166534";
      totalCorrectWords++;
      wordCounted = true;
    } else if (!isCorrect) {
      // Wrong word - show red even if some letters match
      typingDiv.style.backgroundColor = "#fee2e2";
      typingDiv.style.color = "#991b1b";
    }

    // Move to next word after a short delay
    setTimeout((): void => {
      currentWordIndex++;
      typingDiv.value = "";
      typingDiv.style.backgroundColor = "";
      typingDiv.style.color = "";
      wordCounted = false;

      // Load new words if we've typed all current words
      if (currentWordIndex >= quoteWords.length) {
        loadNewWords();
        currentWordIndex = 0;
      }
    }, 500);
  } else if (currentInput.length > 0) {
    // Still typing - show green if correct so far, red if any letter is wrong
    if (isCorrect) {
      typingDiv.style.backgroundColor = "#dcfce7";
      typingDiv.style.color = "#166534";
    } else {
      typingDiv.style.backgroundColor = "#fee2e2";
      typingDiv.style.color = "#991b1b";
    }
  }
});

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

// Modal close handlers
closeModalBtn.addEventListener("click", (): void => {
  resultModal.classList.add("hidden");
});

closeModal.addEventListener("click", (): void => {
  resultModal.classList.add("hidden");
});

// Close modal when clicking outside of it
resultModal.addEventListener("click", (e: Event): void => {
  if ((e.target as HTMLElement) === resultModal) {
    resultModal.classList.add("hidden");
  }
});
