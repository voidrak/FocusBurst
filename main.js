const countdownEl_min = document.querySelector(".time h1");
const countdownEl_sec = document.querySelector(".time h2");
const startBtn = document.querySelector(".start h3");
const pauseBtn = document.querySelector(".start h2");
const resetBtn = document.querySelector(".reset h3");
const breakMinusBtn = document.querySelector(".break-minus");
const breakPlusBtn = document.querySelector(".break-plus");
const pomodoroMinusBtn = document.querySelector(".pomodoro-minus");
const pomodoroPlusBtn = document.querySelector(".pomodoro-plus");
const breakLength = document.querySelector(".break h2");
const pomodoroLength = document.querySelector(".pomodoro h2");

let minutes = parseInt(pomodoroLength.textContent);
let breakMinutes = parseInt(breakLength.textContent);
let seconds = 0;
let countdown;
let isRunning = false;
let minutesRemaining = 0;
let secondsRemaining = 0;

function startCountdown(minutes, seconds) {
  let totalSeconds = minutes * 60 + seconds;

  countdown = setInterval(function () {
    if (isRunning && totalSeconds != 0) {
      minutesRemaining = Math.floor(totalSeconds / 60);
      secondsRemaining = totalSeconds % 60;

      countdownEl_min.textContent = minutesRemaining;
      countdownEl_sec.textContent = secondsRemaining;

      totalSeconds--;

      if (totalSeconds < 0) {
        clearInterval(countdown);
      }
    } else {
      breakCountdown(breakMinutes, 0);
    }
  }, 1000);
}
function breakCountdown(minutes, seconds) {
  let totalSeconds = minutes * 60 + seconds;

  countdown = setInterval(function () {
    if (totalSeconds != 0) {
      let minutesRemaining = Math.floor(totalSeconds / 60);
      let secondsRemaining = totalSeconds % 60;

      countdownEl_min.textContent = minutesRemaining;
      countdownEl_sec.textContent = secondsRemaining;

      totalSeconds--;

      if (totalSeconds < 0) {
        clearInterval(countdown);
      }
    } else {
      startCountdown(minutes, seconds);
    }
  }, 1000);
}

startBtn.addEventListener("click", () => {
  let minutes = parseInt(pomodoroLength.textContent);
  let seconds = 0;
  if (!isRunning) {
    isRunning = true;
    startBtn.style.display = "none";
    pauseBtn.style.display = "block";
    startCountdown(minutes, seconds);
  }
});

pauseBtn.addEventListener("click", () => {
  if (isRunning) {
    clearInterval(countdown);
    pauseBtn.textContent = "Resume";
    isRunning = false;
  } else {
    isRunning = true;
    startCountdown(minutesRemaining, secondsRemaining);
    pauseBtn.textContent = "Pause";
  }
});

resetBtn.addEventListener("click", () => {
  startBtn.style.display = "block";
  pauseBtn.style.display = "none";
  clearInterval(countdown);
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
