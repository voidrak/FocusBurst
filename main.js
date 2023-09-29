//  ADD BOX SHADOW
//  ADD MORE TEXTS LIKE QUOTES
//   ADD THE APP NAME LIKE LOGO
//  TRY WHITE AND BLACK IN COUNTDOWN
// SPOTIFY
// MAKE THE COUNTDOWN SMALL PART OF THE WEB
//
//
//
const body = document.querySelector("body");
const countdownEl_min = document.querySelector(".time h1");
const countdownEl_sec = document.querySelector(".time h2");
const startBtn = document.querySelector(".start-h2");
const pauseBtn = document.querySelector(".pause");
const resetBtn = document.querySelector(".reset h3");
const breakMinusBtn = document.querySelector(".break-minus");
const breakPlusBtn = document.querySelector(".break-plus");
const pomodoroMinusBtn = document.querySelector(".pomodoro-minus");
const pomodoroPlusBtn = document.querySelector(".pomodoro-plus");
const breakLength = document.querySelector(".break h2");
const pomodoroLength = document.querySelector(".pomodoro h2");
const breakContainer = document.querySelector(".add-btn .break");
const pomodoroContainer = document.querySelector(".add-btn .pomodoro");

let pomodoroMinutes;
let breakMinutes = parseInt(breakLength.textContent);
let seconds = 0;
let countdownPomodoro;
let countdownBreak;
let isRunning = false;
let minutesRemaining = 0;
let secondsRemaining = 0;

window.addEventListener("load", function () {
  document.body.classList.add("body-loaded");
});

function playAlertSound() {
  // Create an Audio object and provide the path to the sound file
  let alertSound = new Audio("beep.mp3");
  alertSound.play();
}

function startCountdown(minutes, seconds) {
  pomodoroContainer.style.backgroundColor = "rgb(28, 201, 22)";
  breakContainer.style.backgroundColor = "black";

  let totalSeconds = minutes * 60 + seconds;

  countdownPomodoro = setInterval(function () {
    if (isRunning && totalSeconds >= 0) {
      minutesRemaining = Math.floor(totalSeconds / 60);
      secondsRemaining = totalSeconds % 60;

      countdownEl_min.textContent = minutesRemaining;
      countdownEl_sec.textContent =
        secondsRemaining < 10 ? "0" + secondsRemaining : secondsRemaining;

      if (totalSeconds === 0) {
        clearInterval(countdownPomodoro);
        playAlertSound();
        breakCountdown(breakMinutes, 0);
      }

      totalSeconds--;
    }
  }, 1000);
}

function breakCountdown(minutes, seconds) {
  pauseBtn.style.display = "none";
  breakContainer.style.backgroundColor = "rgb(28, 201, 22)";
  pomodoroContainer.style.backgroundColor = "black";

  let totalSeconds = minutes * 60 + seconds;

  countdownBreak = setInterval(function () {
    if (totalSeconds >= 0) {
      minutesRemaining = Math.floor(totalSeconds / 60);
      secondsRemaining = totalSeconds % 60;

      countdownEl_min.textContent = minutesRemaining;
      countdownEl_sec.textContent =
        secondsRemaining < 10 ? "0" + secondsRemaining : secondsRemaining;

      if (totalSeconds === 0) {
        clearInterval(countdownBreak);
        playAlertSound();
        startCountdown(pomodoroMinutes, 0);
        pauseBtn.style.display = "block";
      }

      totalSeconds--;
    }
  }, 1000);
}

startBtn.addEventListener("click", () => {
  pomodoroMinutes = parseInt(pomodoroLength.textContent);
  let seconds = 0;
  if (!isRunning) {
    isRunning = true;
    startBtn.style.display = "none";
    pauseBtn.style.display = "block";
    breakMinutes = parseInt(breakLength.textContent);
    startCountdown(pomodoroMinutes, seconds);
  }
});

pauseBtn.addEventListener("click", () => {
  if (isRunning) {
    clearInterval(countdownPomodoro);
    clearInterval(countdownBreak);
    pauseBtn.innerHTML = "<h3>Resume</h3>";
    isRunning = false;
  } else {
    isRunning = true;
    startCountdown(minutesRemaining, secondsRemaining);
    pauseBtn.innerHTML = "<h3>Pause</h3>";
  }
});

resetBtn.addEventListener("click", () => {
  startBtn.style.display = "block";
  pauseBtn.style.display = "none";
  clearInterval(countdownBreak);
  clearInterval(countdownPomodoro);
  countdownEl_min.textContent = pomodoroLength.textContent;
  countdownEl_sec.textContent = "00";
});

breakPlusBtn.addEventListener("click", () => {
  let breakNum = parseInt(breakLength.textContent);
  if (breakNum < 25) {
    breakNum += 1;
  }
  breakLength.textContent = breakNum;
});

breakMinusBtn.addEventListener("click", () => {
  let breakNum = parseInt(breakLength.textContent);
  if (breakNum > 2) {
    breakNum -= 1;
  }
  breakLength.textContent = breakNum;
});

pomodoroPlusBtn.addEventListener("click", () => {
  let pomodoroNum = parseInt(pomodoroLength.textContent);
  if (pomodoroNum < 60) {
    pomodoroNum += 5;
  }
  pomodoroLength.textContent = pomodoroNum;
});

pomodoroMinusBtn.addEventListener("click", () => {
  let pomodoroNum = parseInt(pomodoroLength.textContent);
  if (pomodoroNum > 5) {
    pomodoroNum -= 5;
  }
  pomodoroLength.textContent = pomodoroNum;
});
