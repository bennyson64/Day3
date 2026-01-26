"use strict";
// "https://api.allorigins.win/raw?url=https://zenquotes.io/api/random"
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const RANDOM_QUOTE_URL = "https://random-word-api.herokuapp.com/word?number=1";
const quoteDisp = document.getElementById("static-content");
function getUrl() {
    return fetch(RANDOM_QUOTE_URL)
        .then((response) => response.json())
        .then((data) => data.join(" "));
}
function getQuote() {
    return __awaiter(this, void 0, void 0, function* () {
        quoteDisp.innerText = "Loading...";
        try {
            const quote = yield getUrl();
            quoteDisp.innerText = quote;
        }
        catch (error) {
            quoteDisp.innerText = String(error);
            console.error(error);
        }
    });
}
getQuote();
const typingDiv = document.getElementById("elemdisp");
typingDiv.disabled = true;
const button = document.getElementById("calcBtn");
const timerdisplay = document.getElementById("timer");
const startBtn = document.getElementById("startBtn");
const resultModal = document.getElementById("resultModal");
const closeModalBtn = document.getElementById("closeModalBtn");
const closeModal = document.getElementById("closeModal");
let timeLeft = 30;
let timerId = null;
let startTime = null;
let quoteWords = [];
let currentWordIndex = 0;
let currentWordIndexForAccuracy = 0;
let denominatorForAccuracy = 0;
let totalCorrectWords = 0;
let totalWordsAttemptedCount = 0;
let wordCounted = false;
// Load new words from API
function loadNewWords() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const newQuote = yield getUrl();
            quoteWords = newQuote.trim().split(/\s+/);
            currentWordIndex = 0;
            quoteDisp.innerText = quoteWords.join(" ");
        }
        catch (error) {
            console.error("Failed to load new words:", error);
        }
    });
}
// Initialize with first set of words
loadNewWords();
startBtn.addEventListener("click", () => {
    if (timerId !== null)
        return;
    timeLeft = 30;
    timerdisplay.textContent = timeLeft.toString();
    startTime = Date.now();
    console.log(startTime);
    button.disabled = true;
    startBtn.disabled = true;
    typingDiv.disabled = false;
    button.classList.add("disabled-btn");
    document.addEventListener("click", (e) => {
        if (button.disabled === true) {
            startBtn.classList.add("startBtn");
        }
    });
    timerId = setInterval(() => {
        if (timeLeft === 0) {
            clearInterval(timerId);
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
button.addEventListener("click", () => {
    const timeTaken = (Date.now() - (startTime || 0)) / 1000 / 60;
    const wpm = timeTaken > 0 ? totalCorrectWords / timeTaken : 0;
    const totalWordsAttempted = currentWordIndex > 0 ? currentWordIndex : 1;
    const accuracy = (((currentWordIndexForAccuracy / totalWordsAttemptedCount) * 100));
    // Update modal with results
    document.getElementById("modalWpm").textContent =
        wpm.toFixed(2);
    document.getElementById("modalCorrectWords").textContent =
        totalCorrectWords.toString() + "/" + totalWordsAttemptedCount;
    document.getElementById("modalAccuracy").textContent =
        accuracy.toFixed(2) + "%";
    // Show modal
    resultModal.classList.remove("hidden");
});
const keys = document.querySelectorAll(".key");
// Real-time word checking - character by character
typingDiv.addEventListener("input", () => {
    const currentInput = typingDiv.value;
    const expectedWord = quoteWords[currentWordIndex] || "";
    if (currentInput === "") {
        typingDiv.style.backgroundColor = "";
        typingDiv.style.color = "";
        wordCounted = false;
        return;
    }
    // Compare character by character
    let isCorrect = true;
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
            currentWordIndexForAccuracy += 1;
        }
        else if (!isCorrect) {
            // Wrong word - show red even if some letters match
            typingDiv.style.backgroundColor = "#fee2e2";
            typingDiv.style.color = "#991b1b";
        }
        // Move to next word after a short delay
        setTimeout(() => {
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
    }
    else if (currentInput.length > 0) {
        // Still typing - show green if correct so far, red if any letter is wrong
        if (isCorrect) {
            typingDiv.style.backgroundColor = "#dcfce7";
            typingDiv.style.color = "#166534";
        }
        else {
            typingDiv.style.backgroundColor = "#fee2e2";
            typingDiv.style.color = "#991b1b";
        }
    }
});
document.addEventListener("keydown", (e) => {
    keys.forEach((b) => {
        var _a;
        if (((_a = b.textContent) === null || _a === void 0 ? void 0 : _a.toLowerCase()) === e.key.toLowerCase()) {
            b.classList.add("active");
        }
    });
});
document.addEventListener("keyup", (e) => {
    keys.forEach((b) => {
        var _a;
        if (((_a = b.textContent) === null || _a === void 0 ? void 0 : _a.toLowerCase()) === e.key.toLowerCase()) {
            b.classList.remove("active");
        }
    });
});
startBtn.addEventListener("click", () => {
    button.disabled = true;
});
// Modal close handlers
closeModalBtn.addEventListener("click", () => {
    resultModal.classList.add("hidden");
});
closeModal.addEventListener("click", () => {
    resultModal.classList.add("hidden");
});
// Close modal when clicking outside of it
resultModal.addEventListener("click", (e) => {
    if (e.target === resultModal) {
        resultModal.classList.add("hidden");
    }
});
//# sourceMappingURL=scripts.js.map