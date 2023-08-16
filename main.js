const countdownEl_min = document.querySelector(".time h1");
const countdownEl_sec = document.querySelector(".time h2");
const startBtn = document.querySelector(".start h3");
const resetBtn = document.querySelector(".reset h3");
const breakMinusBtn = document.querySelector(".break-minus");
const breakPlusBtn = document.querySelector(".break-plus");
const pomodoroMinusBtn = document.querySelector(".pomodoro-minus");
const pomodoroPlusBtn = document.querySelector(".pomodoro-plus");
const breakLength = document.querySelector(".break h2");
const pomodoroLength = document.querySelector(".pomodoro h2");

let countMin ;
let countSec = countdownEl_sec.textContent;
let timeoutSec;
let timeoutMin;

function countdownMin() {
  if(countMin==1){
    countMin=0;
  }
  if(countMin===0 ){
    console.log("00");
    clearTimeout(timeoutSec);
    clearTimeout(timeoutMin);
  countdownEl_sec.textContent=0;
  }
  
  countdownEl_min.textContent = countMin;
  countMin--;
  if (countMin >= 0) {
    timeoutMin = setTimeout(countdownMin, 60000);
  }
}

function countdownSec() {
  
  if(countSec===0){
    console.log("00");
    // clearTimeout(timeoutSec);
    // clearTimeout(timeoutMin);
  // countdownEl_sec.textContent=0;
  }
    countdownEl_sec.textContent = countSec;
    if(countSec==0){
      countSec=60;
    }
    countSec--;
    if (countSec >= 0) {
      timeoutSec = setTimeout(countdownSec, 1000);
    }
  
  
}

startBtn.addEventListener("click", () => {
  countMin = pomodoroLength.textContent;
  countdownMin();
  countdownSec();
});

resetBtn.addEventListener("click", () => {
  clearTimeout(timeoutSec);
  clearTimeout(timeoutMin);
  countdownEl_min.textContent = pomodoroLength.textContent;
  countdownEl_sec.textContent="00";
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
