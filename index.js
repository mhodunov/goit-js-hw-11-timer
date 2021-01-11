class CountdownTimer {

  constructor ({selector, targetDate}) {
    
    this.targetDate = targetDate;
    // Записываем доступы к соответсвующим элементам на странице
    this.timer = document.getElementById(selector);
    this.days = this.timer.querySelector('span[data-value="days"]');
    this.hours = this.timer.querySelector('span[data-value="hours"]');
    this.mins = this.timer.querySelector('span[data-value="mins"]');
    this.secs = this.timer.querySelector('span[data-value="secs"]');

  }

    // Метод, который с интервалом отсчитывает время
  start() {
    // Функция обновления элементов на странице вызвана сразу, чтобы не "мелькали" значения прописанные в HTML
    this.updateTimerOutput();

    setInterval(() => {
      this.updateTimerOutput();
    }, 1000);
  }

  // Функция для обновления значений элментов на странице
  updateTimerOutput() {
    let time = this.targetDate - Date.now();
    const { days, hours, mins, secs } = this.calculateTime(time);

    this.days.textContent = days;
    this.hours.textContent = hours;
    this.mins.textContent = mins;
    this.secs.textContent = secs;
  }

  // Вспомогательные функции для подсчёта дней, часов и т.д.
  calculateTime(time) {
    const days = this.pad(Math.floor(time / (1000 * 60 * 60 * 24)));
    const hours = this.pad(
      Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    );
    const mins = this.pad(Math.floor((time % (1000 * 60 * 60)) / (1000 * 60)));
    const secs = this.pad(Math.floor((time % (1000 * 60)) / 1000));

    return { days, hours, mins, secs };
  }

  pad(value) {
    return String(value).padStart(2, "0");
  }
}

// Таймер отсчёта до определенной даты
const newYearCountdown = new CountdownTimer({
  selector: "timer-1",
  targetDate: new Date("Dec 31, 2021"),
});

// Вызываем таймер
newYearCountdown.start();