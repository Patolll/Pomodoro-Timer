const toDoBtn = document.getElementById("to-do-Btn");
const pomodoroTimer = document.getElementById("timer");
const addBox = document.getElementById("add-to-do-task");
const toDoAddBtn = document.getElementById("to-do-add-Btn");
const addInput = document.getElementById("to-do-input");
const ulList = document.getElementById("ulList");

let startTime;
let timer = null;
let remainingTime = 0;
let isRunning = false;
let timerTime = 25;
let pomodoro = 0;
let shortBreak = 0;
let longBreak = 0;

startTime = Date.now() + 1000 * 60 * timerTime;
let startBtn = document.getElementById("startBtn");
startBtn.addEventListener("click", start);

const buttons = document.querySelectorAll(".timer-buttons");
buttons.forEach((button) => {
  button.addEventListener("click", () => {
    buttons.forEach((btn) => {
      btn.classList.remove("workingBtn");
    });
    if (button.classList.contains("work")) {
      timerTime = 25; // Pomodoro (25 minutes)
    } else if (button.classList.contains("short")) {
      timerTime = 5; // Short break (5 minutes)
    } else if (button.classList.contains("long")) {
      timerTime = 15; // Long break (15 minutes)
    }
    resetTimer();
    startTime = Date.now() + 1000 * 60 * timerTime;
    pomodoroTimer.textContent = `${String(timerTime).padStart(2, "0")}:00`;
    button.classList.add("workingBtn");
  });
});

function start() {
  if (!isRunning) {
    timer = setInterval(update, 1000);
    isRunning = true;
    startBtn.textContent = "PAUSE";
  } else if (isRunning) {
    clearInterval(timer);
    isRunning = false;
    startBtn.textContent = "START";
  }
}

function update() {
  const currentTime = Date.now();
  remainingTime = startTime - currentTime;

  if (remainingTime <= 0) {
    switch (timerTime) {
      case 25:
        pomodoro++;
        document.getElementById("pomodoroCount").textContent = pomodoro;
        break;
      case 5:
        shortBreak++;
        document.getElementById("shortBreakCount").textContent = shortBreak;
        break;
      case 15:
        longBreak++;
        document.getElementById("longBreakCount").textContent = longBreak;
        break;
    }

    clearInterval(timer);
    isRunning = false;
    nextSession();
    return;
  }

  let minutes = Math.floor((remainingTime / (1000 * 60)) % 60)
    .toString()
    .padStart(2, 0);
  let seconds = Math.floor((remainingTime / 1000) % 60)
    .toString()
    .padStart(2, 0);
  pomodoroTimer.textContent = `${minutes}:${seconds}`;
}

function resetTimer() {
  clearInterval(timer);
  remainingTime = 0;
  isRunning = false;
  startBtn.textContent = "START";
  pomodoroTimer.textContent = `${String(timerTime).padStart(2, "0")}:00`;
}

function nextSession() {
  if (timerTime === 25) {
    if (pomodoro % 4 === 0) {
      timerTime = 15;
    } else {
      timerTime = 5;
    }
  } else if (timerTime === 5) {
    timerTime = 25;
  } else if (timerTime === 15) {
    timerTime = 25;
  }

  buttons.forEach((btn) => {
    btn.classList.remove("workingBtn");
    if (btn.classList.contains("work") && timerTime === 25) {
      btn.classList.add("workingBtn");
    } else if (btn.classList.contains("short") && timerTime === 5) {
      btn.classList.add("workingBtn");
    } else if (btn.classList.contains("long") && timerTime === 15) {
      btn.classList.add("workingBtn");
    }
  });

  resetTimer();
  startTime = Date.now() + 1000 * 60 * timerTime;
}

toDoBtn.addEventListener("click", () => {
  if (addBox.style.display === "") {
    addBox.style.display = "flex";
  } else {
    console.error("Add box is already displayed");
  }
});
toDoAddBtn.addEventListener("click", () => {
  const elementText = addInput.value.trim();
  if (addInput.value !== "") {
    addInput.value = elementText;
    createElement(elementText);
    addInput.value = "";
  }
});

function createElement(inputValue) {
  const li = document.createElement("li");
  li.textContent = inputValue;
  ulList.appendChild(li);
}
