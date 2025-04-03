const toDoBtn = document.getElementById("to-do-Btn");
const pomodoroTimer = document.getElementById("timer");
const addBox = document.getElementById("add-to-do-task");
const toDoAddBtn = document.getElementById("to-do-add-Btn");
const addInput = document.getElementById("to-do-input");
const ulList = document.getElementById("ulList");
const skipBtn = document.getElementById("skipBtn");

let timer = null;
let isRunning = false;
let timerTime = 25;
let remainingTime = timerTime * 60;
let pomodoro = 0;
let shortBreak = 0;
let longBreak = 0;

pomodoroTimer.textContent = formatTime(remainingTime);

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

    nextSession();
  }
}

function resetTimer() {
  clearInterval(timer);
  isRunning = false;
  startBtn.textContent = "START";
  remainingTime = timerTime * 60;
  pomodoroTimer.textContent = formatTime(remainingTime);
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
  nextSession();
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
