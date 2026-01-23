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
const RANDOM_QUOTE_URL = "https://random-word-api.herokuapp.com/word?number=50";
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
            quoteDisp.innerText = error;
            console.error(error);
        }
    });
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
    const accuracy = typedWords.length > 0 ? (correctWords / typedWords.length) * 100 : 0;
    const timeTaken = (Date.now() - (startTime || 0)) / 1000 / 60;
    const wpm = timeTaken > 0 ? correctWords / timeTaken : 0;
    result.textContent = `Correct words: ${correctWords}/${quoteWords.length}, Accuracy: ${accuracy.toFixed(2)}%, WPM: ${wpm.toFixed(2)}`;
});
const keys = document.querySelectorAll(".key");
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
