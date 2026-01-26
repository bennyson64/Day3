// "https://api.allorigins.win/raw?url=https://zenquotes.io/api/random"
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
var __generator =
  (this && this.__generator) ||
  function (thisArg, body) {
    var _ = {
        label: 0,
        sent: function () {
          if (t[0] & 1) throw t[1];
          return t[1];
        },
        trys: [],
        ops: [],
      },
      f,
      y,
      t,
      g = Object.create(
        (typeof Iterator === "function" ? Iterator : Object).prototype,
      );
    return (
      (g.next = verb(0)),
      (g["throw"] = verb(1)),
      (g["return"] = verb(2)),
      typeof Symbol === "function" &&
        (g[Symbol.iterator] = function () {
          return this;
        }),
      g
    );
    function verb(n) {
      return function (v) {
        return step([n, v]);
      };
    }
    function step(op) {
      if (f) throw new TypeError("Generator is already executing.");
      while ((g && ((g = 0), op[0] && (_ = 0)), _))
        try {
          if (
            ((f = 1),
            y &&
              (t =
                op[0] & 2
                  ? y["return"]
                  : op[0]
                    ? y["throw"] || ((t = y["return"]) && t.call(y), 0)
                    : y.next) &&
              !(t = t.call(y, op[1])).done)
          )
            return t;
          if (((y = 0), t)) op = [op[0] & 2, t.value];
          switch (op[0]) {
            case 0:
            case 1:
              t = op;
              break;
            case 4:
              _.label++;
              return { value: op[1], done: false };
            case 5:
              _.label++;
              y = op[1];
              op = [0];
              continue;
            case 7:
              op = _.ops.pop();
              _.trys.pop();
              continue;
            default:
              if (
                !((t = _.trys), (t = t.length > 0 && t[t.length - 1])) &&
                (op[0] === 6 || op[0] === 2)
              ) {
                _ = 0;
                continue;
              }
              if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) {
                _.label = op[1];
                break;
              }
              if (op[0] === 6 && _.label < t[1]) {
                _.label = t[1];
                t = op;
                break;
              }
              if (t && _.label < t[2]) {
                _.label = t[2];
                _.ops.push(op);
                break;
              }
              if (t[2]) _.ops.pop();
              _.trys.pop();
              continue;
          }
          op = body.call(thisArg, _);
        } catch (e) {
          op = [6, e];
          y = 0;
        } finally {
          f = t = 0;
        }
      if (op[0] & 5) throw op[1];
      return { value: op[0] ? op[1] : void 0, done: true };
    }
  };
var RANDOM_QUOTE_URL = "https://random-word-api.herokuapp.com/word?number=50";
var quoteDisp = document.getElementById("static-content");
function getUrl() {
  return fetch(RANDOM_QUOTE_URL)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      return data.join(" ");
    });
}
function getQuote() {
  return __awaiter(this, void 0, void 0, function () {
    var quote, error_1;
    return __generator(this, function (_a) {
      switch (_a.label) {
        case 0:
          quoteDisp.innerText = "Loading...";
          _a.label = 1;
        case 1:
          _a.trys.push([1, 3, , 4]);
          return [4 /*yield*/, getUrl()];
        case 2:
          quote = _a.sent();
          quoteDisp.innerText = quote;
          return [3 /*break*/, 4];
        case 3:
          error_1 = _a.sent();
          quoteDisp.innerText = error_1;
          console.error(error_1);
          return [3 /*break*/, 4];
        case 4:
          return [2 /*return*/];
      }
    });
  });
}
getQuote();
var typingDiv = document.getElementById("elemdisp");
typingDiv.disabled = true;
var button = document.getElementById("calcBtn");
var result = document.getElementById("result");
var timerdisplay = document.getElementById("timer");
var startBtn = document.getElementById("startBtn");
var resultModal = document.getElementById("resultModal");
var closeModalBtn = document.getElementById("closeModalBtn");
var closeModal = document.getElementById("closeModal");
var timeLeft = 30;
var timerId = null;
var startTime = null;
startBtn.addEventListener("click", function () {
  if (timerId !== null) return;
  timeLeft = 30;
  timerdisplay.textContent = timeLeft.toString();
  startTime = Date.now();
  console.log(startTime);
  button.disabled = true;
  startBtn.disabled = true;
  typingDiv.disabled = false;
  button.classList.add("disabled-btn");
  document.addEventListener("click", function (e) {
    if (button.disabled === true) {
      startBtn.classList.add("startBtn");
    }
  });
  timerId = setInterval(function () {
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
button.addEventListener("click", function () {
  var typedText = typingDiv.value;
  var quoteText = quoteDisp.innerText;
  var typedWords = typedText.trim().split(/\s+/);
  var quoteWords = quoteText.trim().split(/\s+/);
  var correctWords = 0;
  for (var i = 0; i < Math.min(typedWords.length, quoteWords.length); i++) {
    if (typedWords[i] === quoteWords[i]) {
      correctWords++;
    }
  }
  var accuracy =
    typedWords.length > 0 ? (correctWords / typedWords.length) * 100 : 0;
  var timeTaken = (Date.now() - (startTime || 0)) / 1000 / 60;
  var wpm = timeTaken > 0 ? correctWords / timeTaken : 0;

  // Update modal with results
  document.getElementById("modalWpm").textContent = wpm.toFixed(2);
  document.getElementById("modalCorrectWords").textContent =
    correctWords + "/" + quoteWords.length;
  document.getElementById("modalAccuracy").textContent =
    accuracy.toFixed(2) + "%";

  // Show modal
  resultModal.classList.remove("hidden");
});
var keys = document.querySelectorAll(".key");
document.addEventListener("keydown", function (e) {
  keys.forEach(function (b) {
    var _a;
    if (
      ((_a = b.textContent) === null || _a === void 0
        ? void 0
        : _a.toLowerCase()) === e.key.toLowerCase()
    ) {
      b.classList.add("active");
    }
  });
});
document.addEventListener("keyup", function (e) {
  keys.forEach(function (b) {
    var _a;
    if (
      ((_a = b.textContent) === null || _a === void 0
        ? void 0
        : _a.toLowerCase()) === e.key.toLowerCase()
    ) {
      b.classList.remove("active");
    }
  });
});
startBtn.addEventListener("click", function () {
  button.disabled = true;
});

// Modal close handlers
closeModalBtn.addEventListener("click", function () {
  resultModal.classList.add("hidden");
});

closeModal.addEventListener("click", function () {
  resultModal.classList.add("hidden");
});

// Close modal when clicking outside of it
resultModal.addEventListener("click", function (e) {
  if (e.target === resultModal) {
    resultModal.classList.add("hidden");
  }
});
