const toDoBtn = document.getElementById("to-do-Btn");
const pomodoroTimer = document.getElementById("timer");
const addBox = document.getElementById("add-to-do-task");
const toDoAddBtn = document.getElementById("to-do-add-Btn");
const addInput = document.getElementById("to-do-input");
const ulList = document.getElementById("ulList");
const skipBtn = document.getElementById("skipBtn");
const settingsBtn = document.getElementById("settingsBtn");
const settingsBox = document.getElementById("settings");
const settingsClose = document.getElementById("settingsClose");
const alarmSound = new Audio("alarm.mp3");
const confirmBtn = document.getElementById("confirm-settings-btn");
let timer = null;
let isRunning = false;

let pomodoroTime = 25;
let shortTime = 5;
let longTime = 15;
let remainingTime;
let pomodoro = 0;
let shortBreak = 0;
let longBreak = 0;

remainingTime = pomodoroTime * 60;
confirmBtn.addEventListener("click", () => {
  let select = document.querySelector("select");
  let selectedValue = select.value;
  let pomodoroNew = Number(document.getElementById("pomodoro-session").value);
  let shortNew = Number(document.getElementById("short-session").value);
  let longNew = Number(document.getElementById("long-session").value);

  if (!isNaN(pomodoroNew) && pomodoroNew > 0) {
    pomodoroTime = pomodoroNew;
  }
  if (!isNaN(shortNew) && shortNew > 0) {
    shortTime = shortNew;
  }
  if (!isNaN(longNew) && longNew > 0) {
    longTime = longNew;
  }

  if (document.querySelector(".work.workingBtn")) {
    remainingTime = pomodoroTime * 60;
  } else if (document.querySelector(".short.workingBtn")) {
    remainingTime = shortTime * 60;
  } else if (document.querySelector(".long.workingBtn")) {
    remainingTime = longTime * 60;
  }
  if (selectedValue === "classic") {
    alarmSound.src = "alarm.mp3";
  } else if (selectedValue === "digital") {
    alarmSound.src = "digitalAlarm.mp3";
  }
  pomodoroTimer.textContent = formatTime(remainingTime);
  settingsBox.style.display = "none";
  document.getElementById("pomodoro-session").value = "";
  document.getElementById("short-session").value = "";
  document.getElementById("long-session").value = "";
});

let startBtn = document.getElementById("startBtn");
startBtn.addEventListener("click", start);

const buttons = document.querySelectorAll(".timer-buttons");
buttons.forEach((button) => {
  button.addEventListener("click", () => {
    resetTimer();
    buttons.forEach((btn) => btn.classList.remove("workingBtn"));
    if (button.classList.contains("work")) {
      remainingTime = pomodoroTime * 60;
    } else if (button.classList.contains("short")) {
      remainingTime = shortTime * 60;
    } else if (button.classList.contains("long")) {
      remainingTime = longTime * 60;
    }
    pomodoroTimer.textContent = formatTime(remainingTime);
    button.classList.add("workingBtn");
  });
});

function formatTime(time) {
  let minutes = Math.floor(time / 60)
    .toString()
    .padStart(2, "0");
  let seconds = (time % 60).toString().padStart(2, "0");
  return `${minutes}:${seconds}`;
}

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
  if (remainingTime > 0) {
    remainingTime--;
    pomodoroTimer.textContent = formatTime(remainingTime);
  } else {
    alarmSound.play();
    nextSession(); // Po zakończeniu sesji przechodzimy do kolejnej
  }
}

function resetTimer() {
  clearInterval(timer);
  isRunning = false;
  startBtn.textContent = "START";
  if (document.querySelector(".work.workingBtn")) {
    remainingTime = pomodoroTime * 60; // Sesja pracy
  } else if (document.querySelector(".short.workingBtn")) {
    remainingTime = shortTime * 60; // Krótka przerwa
  } else if (document.querySelector(".long.workingBtn")) {
    remainingTime = longTime * 60; // Długa przerwa
  }
  pomodoroTimer.textContent = formatTime(remainingTime);
}
function nextSession() {
  if (document.querySelector(".work.workingBtn")) {
    pomodoro++;
    document.getElementById("pomodoroCount").textContent = pomodoro;
    if (pomodoro % 4 === 0) {
      remainingTime = longTime * 60;
    } else {
      remainingTime = shortTime * 60;
    }
  } else if (document.querySelector(".short.workingBtn")) {
    shortBreak++;
    document.getElementById("shortBreakCount").textContent = shortBreak;
    remainingTime = pomodoroTime * 60;
  } else if (document.querySelector(".long.workingBtn")) {
    longBreak++;
    document.getElementById("longBreakCount").textContent = longBreak;
    remainingTime = pomodoroTime * 60;
  }
  pomodoroTimer.textContent = formatTime(remainingTime);

  buttons.forEach((btn) => {
    btn.classList.remove("workingBtn");

    if (btn.classList.contains("work") && remainingTime === pomodoroTime * 60) {
      btn.classList.add("workingBtn");
    } else if (
      btn.classList.contains("short") &&
      remainingTime === shortTime * 60
    ) {
      btn.classList.add("workingBtn");
    } else if (
      btn.classList.contains("long") &&
      remainingTime === longTime * 60
    ) {
      btn.classList.add("workingBtn");
    }
  });
  resetTimer();
}

toDoBtn.addEventListener("click", () => {
  if (addBox.style.display !== "flex") {
    addBox.style.display = "flex";
    addBox.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
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
    addBox.style.display = "none";
  }
});

function createElement(inputValue) {
  const textDiv = document.createElement("div");
  const li = document.createElement("li");
  const btnsDiv = document.createElement("div");

  btnsDiv.classList.add("btnsDiv");
  textDiv.classList.add("textDiv");
  textDiv.textContent = inputValue;
  li.appendChild(textDiv);
  li.appendChild(btnsDiv);
  createDelete(btnsDiv, li);
  createCheckmark(li, btnsDiv, textDiv);

  ulList.appendChild(li);
}
function createCheckmark(liAppend, btnsDiv, textDiv) {
  const label = document.createElement("label");
  const input = document.createElement("input");
  const div = document.createElement("div");

  label.classList.add("container");
  div.classList.add("checkmark");

  input.type = "checkbox";
  label.appendChild(input);
  label.appendChild(div);
  btnsDiv.appendChild(label);
  input.addEventListener("change", () => {
    textDiv.classList.toggle("marked");
    liAppend.classList.toggle("liColorChange");
  });
}
skipBtn.addEventListener("click", () => {
  clearInterval(timer);
  isRunning = false;
  startBtn.textContent = "START";

  nextSession();

  pomodoroTimer.textContent = formatTime(remainingTime);
});

function createDelete(btnsDiv, li) {
  const deleteBtn = document.createElement("button");
  deleteBtn.classList.add("bin-button");
  deleteBtn.innerHTML = `
  <svg class="bin-top" viewBox="0 0 39 7" fill="none" xmlns="http://www.w3.org/2000/svg">
    <line y1="5" x2="39" y2="5" stroke="white" stroke-width="4"></line>
    <line x1="12" y1="1.5" x2="26.0357" y2="1.5" stroke="white" stroke-width="3"></line>
  </svg>
  <svg class="bin-bottom" viewBox="0 0 33 39" fill="none" xmlns="http://www.w3.org/2000/svg">
    <mask id="path-1-inside-1_8_19" fill="white">
      <path d="M0 0H33V35C33 37.2091 31.2091 39 29 39H4C1.79086 39 0 37.2091 0 35V0Z"></path>
    </mask>
    <path d="M0 0H33H0ZM37 35C37 39.4183 33.4183 43 29 43H4C-0.418278 43 -4 39.4183 -4 35H4H29H37ZM4 43C-0.418278 43 -4 39.4183 -4 35V0H4V35V43ZM37 0V35C37 39.4183 33.4183 43 29 43V35V0H37Z" fill="white" mask="url(#path-1-inside-1_8_19)"></path>
    <path d="M12 6L12 29" stroke="white" stroke-width="4"></path>
    <path d="M21 6V29" stroke="white" stroke-width="4"></path>
  </svg>
`;
  btnsDiv.appendChild(deleteBtn);
  deleteBtn.addEventListener("click", () => {
    li.classList.add("remove-animation");
    setTimeout(() => li.remove(), 300);
  });
}
settingsBtn.addEventListener("click", () => {
  if (settingsBox.style.display !== "block") {
    settingsBox.style.display = "block";
  }
});
settingsClose.addEventListener("click", () => {
  if (settingsBox.style.display === "block") {
    settingsBox.style.display = "";
  }
});
