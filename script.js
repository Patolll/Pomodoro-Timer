const pomodoroTimer = document.getElementById("timer");
let startTime;
let timer = null;
let remainingTime = 0;
let isRunning = false;
let timerTime = 25; // Default Pomodoro time (25 minutes)
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
    nextSession();
    clearInterval(timer);
    pomodoroTimer.textContent = "00:00";
    isRunning = false;

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
  // Sprawdzamy, która sesja była zakończona i ustawiamy kolejną
  if (timerTime === 25) {
    // Po Pomodoro (25 minut), sprawdzamy czy już minęły 4 sesje
    if (pomodoro % 4 === 0) {
      // Po czterech Pomodoro przechodzimy na długą przerwę (15 minut)
      timerTime = 15; // Długa przerwa (15 minut)
    } else {
      // W przeciwnym razie krótka przerwa (5 minut)
      timerTime = 5; // Krótka przerwa (5 minut)
    }
  } else if (timerTime === 5) {
    // Po krótkiej przerwie wracamy do Pomodoro (25 minut)
    timerTime = 25;
  } else if (timerTime === 15) {
    // Po długiej przerwie wracamy do Pomodoro (25 minut)
    timerTime = 25;
  }

  // Zmiana klasy przycisku i wyświetlanie odpowiedniej liczby
  buttons.forEach((btn) => {
    btn.classList.remove("workingBtn");
    if (btn.classList.contains("work") && timerTime === 25) {
      btn.classList.add("workingBtn"); // Przycisk Pomodoro
    } else if (btn.classList.contains("short") && timerTime === 5) {
      btn.classList.add("workingBtn"); // Przycisk krótkiej przerwy
    } else if (btn.classList.contains("long") && timerTime === 15) {
      btn.classList.add("workingBtn"); // Przycisk długiej przerwy
    }
  });

  // Ustawienie nowego startu timera na odpowiednią sesję
  resetTimer();
  startTime = Date.now() + 1000 * 60 * timerTime;
}
