const pomodoroTimer = document.getElementById("timer");
let startTime;
let timer = null;
let elapsedTime = 0;
let isRunning = false;
function start() {
  if (!isRunning) {
    startTime = Date.now() + 1000 * 60 * 25;
    timer = setInterval(update, 100);
    isRunning = true;
  }
}
function update() {
  const currentTime = Date.now();
  elapsedTime = startTime - currentTime;
  if (elapsedTime <= 0) {
    clearInterval(timer);
    pomodoroTimer.textContent = "00:00";
    isRunning = false;
    return;
  }
  let minutes = Math.floor(elapsedTime / (1000 * 60))
    .toString()
    .padStart(2, "0");
  let seconds = Math.floor((elapsedTime % (1000 * 60)) / 1000)
    .toString()
    .padStart(2, "0");
  pomodoroTimer.textContent = `${minutes}:${seconds}`;
}
document.getElementById("startBtn").addEventListener("click", start);
const buttons = document.querySelectorAll(".timer-buttons");
buttons.forEach((button) => {
  button.addEventListener("click", () => {
    buttons.forEach((btn) => {
      btn.classList.remove("workingBtn");
    });
    button.classList.add("workingBtn");
  });
});
