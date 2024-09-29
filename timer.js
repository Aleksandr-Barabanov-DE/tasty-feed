let timerWrapper;
let timerIsRunning = false;
const timerModal = document.createElement("div");

export function formatNumber(value) {
  return value.toString().padStart(2, "0");
}

export function checkValue(input) {
  if (input.value < parseInt(input.min)) {
    input.value = input.min;
  } else if (input.value > parseInt(input.max)) {
    input.value = input.max;
  }
}

export function createTimer() {
  const timerModal = document.createElement("div");
  timerModal.classList.add("timer");
  document.body.appendChild(timerModal);

  const audio = document.createElement("audio");
  audio.classList.add("hidden");
  audio.setAttribute("src", "timer.mp3");
  audio.setAttribute("id", "timer-audio");
  document.body.appendChild(audio);

  const buttonCloseTimer = document.createElement("button");
  buttonCloseTimer.classList.add("button-close");
  buttonCloseTimer.classList.add("timer-button-close");

  timerModal.appendChild(buttonCloseTimer);

  buttonCloseTimer.addEventListener("click", function () {
    document.body.removeChild(timerModal);
  });

  const timerHeading = document.createElement("h4");
  timerHeading.classList.add("timer-heading");
  timerHeading.textContent = "Select a time.";

  timerModal.appendChild(timerHeading);

  const hours = document.createElement("input");
  const minutes = document.createElement("input");
  const seconds = document.createElement("input");

  hours.setAttribute("type", "number");
  hours.setAttribute("id", "hours");
  hours.setAttribute("min", "0");
  hours.setAttribute("max", "23");
  hours.setAttribute("placeholder", "Hours");

  hours.addEventListener("input", function () {
    checkValue(this);
  });

  minutes.setAttribute("type", "number");
  minutes.setAttribute("id", "minutes");
  minutes.setAttribute("min", "0");
  minutes.setAttribute("max", "59");
  minutes.setAttribute("placeholder", "Minutes");

  minutes.addEventListener("input", function () {
    checkValue(this);
  });

  seconds.setAttribute("type", "number");
  seconds.setAttribute("id", "seconds");
  seconds.setAttribute("min", "0");
  seconds.setAttribute("max", "59");
  seconds.setAttribute("placeholder", "00");
  seconds.classList.add("hidden");

  seconds.addEventListener("input", function () {
    checkValue(this);
  });

  const inputWrapper = document.createElement("div");
  inputWrapper.classList.add("input-wrapper");

  inputWrapper.appendChild(hours);
  inputWrapper.appendChild(minutes);
  inputWrapper.appendChild(seconds);

  timerModal.appendChild(inputWrapper);

  timerWrapper = document.createElement("div");
  timerWrapper.classList.add("timer-wrapper");

  const selectedHours = document.createElement("h5");
  selectedHours.classList.add("hours");
  selectedHours.textContent = "00";
  const timerSeparator = document.createElement("p");
  timerSeparator.textContent = ":";
  const selectedMinutes = document.createElement("h5");
  selectedMinutes.classList.add("minutes");
  selectedMinutes.textContent = "00";
  const secondTimerSeparator = document.createElement("p");
  secondTimerSeparator.textContent = ":";
  const selectedSeconds = document.createElement("h5");
  selectedSeconds.classList.add("seconds");
  selectedSeconds.textContent = "00";

  const restTimeContainer = document.createElement("div");
  restTimeContainer.classList.add("time-wrapper-inner-container");

  const buttonStartTimer = document.createElement("button");
  buttonStartTimer.classList.add("timer-button");
  buttonStartTimer.textContent = "Start Timer";

  const buttonStopTimer = document.createElement("button");
  buttonStopTimer.classList.add("timer-stop-button");
  buttonStopTimer.textContent = "Stop Timer";
  buttonStopTimer.classList.add("hidden");

  restTimeContainer.appendChild(selectedHours);
  restTimeContainer.appendChild(timerSeparator);
  restTimeContainer.appendChild(selectedMinutes);
  restTimeContainer.appendChild(secondTimerSeparator);
  restTimeContainer.appendChild(selectedSeconds);

  timerWrapper.appendChild(restTimeContainer);
  timerWrapper.appendChild(buttonStartTimer);
  timerWrapper.appendChild(buttonStopTimer);

  timerModal.appendChild(timerWrapper);

  initializeTimerFunctionality();
}

export function setTimer() {
  const hours = document.querySelector(".hours");
  const minutes = document.querySelector(".minutes");
  const seconds = document.querySelector(".seconds");

  hours.textContent = "00";
  minutes.textContent = "00";
  seconds.textContent = "00";

  const currentTime = new Date();
  const currentHours = currentTime.getHours();
  const currentMinutes = currentTime.getMinutes();
  const currentSeconds = currentTime.getSeconds();

  const hoursInput = document.querySelector("#hours");
  hoursInput.addEventListener("input", function () {
    let hoursValue = parseInt(hoursInput.value);
    if (isNaN(hoursValue)) {
      hoursValue = 0;
    }
    let userHours = currentHours + hoursValue - currentHours;
    hours.textContent = formatNumber(userHours);
  });

  const minutesInput = document.querySelector("#minutes");
  minutesInput.addEventListener("input", function () {
    let minutesValue = parseInt(minutesInput.value);
    if (isNaN(minutesValue)) {
      minutesValue = 0;
    }
    let userMinutes = currentMinutes + minutesValue - currentMinutes;
    minutes.textContent = formatNumber(userMinutes);
  });

  const secondsInput = document.querySelector("#seconds");
  secondsInput.addEventListener("input", function () {
    let secondsValue = parseInt(secondsInput.value);
    if (isNaN(secondsValue)) {
      secondsValue = 0;
    }
    let userSeconds = currentSeconds + secondsValue - currentSeconds;
    seconds.textContent = formatNumber(userSeconds);
  });

  startSum =
    hoursInput * 60 * 60 * 1000 +
    minutesInput * 60 * 1000 +
    secondsInput * 1000;

  if (
    hours.textContent === 0 &&
    minutes.textContent === 0 &&
    seconds.textContent === 0
  ) {
    return false;
  }

  console.log("Current Time:", currentHours, currentMinutes, currentSeconds);
}

let timerInterval;
let startSum;

export function startTimer() {
  const hours = document.querySelector(".hours");
  const minutes = document.querySelector(".minutes");
  const seconds = document.querySelector(".seconds");

  let plannedTimeHours = parseInt(hours.textContent);
  let plannedTimeMinutes = parseInt(minutes.textContent);
  let plannedTimeSeconds = parseInt(seconds.textContent);

  if (
    plannedTimeHours === 0 &&
    plannedTimeMinutes === 0 &&
    plannedTimeSeconds === 0
  ) {
    clearInterval(timerInterval);
    timerIsRunning = false;

    timerWrapper.classList.remove("green", "yellow", "orange", "red");

    const audio = document.getElementById("timer-audio");
    if (audio) {
      audio.play();
    }

    console.log("Timer completed");
    return;
  }

  if (!startSum) {
    startSum =
      plannedTimeHours * 60 * 60 * 1000 +
      plannedTimeMinutes * 60 * 1000 +
      plannedTimeSeconds * 1000;
  }

  let currentSum =
    plannedTimeHours * 60 * 60 * 1000 +
    plannedTimeMinutes * 60 * 1000 +
    plannedTimeSeconds * 1000;

  timerWrapper.classList.remove("green", "yellow", "orange", "red");

  if (startSum <= 60 * 1000) {
    if (currentSum <= 10 * 1000) {
      timerWrapper.classList.add("green");
    } else if (currentSum <= 30 * 1000) {
      timerWrapper.classList.add("yellow");
    } else if (currentSum <= 45 * 1000) {
      timerWrapper.classList.add("orange");
    } else {
      timerWrapper.classList.add("red");
    }
  } else if (startSum <= 5 * 60 * 1000) {
    if (currentSum <= 20 * 1000) {
      timerWrapper.classList.add("green");
    } else if (currentSum <= startSum * 0.25) {
      timerWrapper.classList.add("yellow");
    } else if (currentSum <= startSum * 0.5) {
      timerWrapper.classList.add("orange");
    } else {
      timerWrapper.classList.add("red");
    }
  } else if (startSum <= 20 * 60 * 1000) {
    if (currentSum <= 30 * 1000) {
      timerWrapper.classList.add("green");
    } else if (currentSum <= startSum * 0.25) {
      timerWrapper.classList.add("yellow");
    } else if (currentSum <= startSum * 0.5) {
      timerWrapper.classList.add("orange");
    } else {
      timerWrapper.classList.add("red");
    }
  } else if (startSum <= 60 * 60 * 1000) {
    if (currentSum <= 60 * 1000) {
      timerWrapper.classList.add("green");
    } else if (currentSum <= startSum * 0.25) {
      timerWrapper.classList.add("yellow");
    } else if (currentSum <= startSum * 0.5) {
      timerWrapper.classList.add("orange");
    } else {
      timerWrapper.classList.add("red");
    }
  } else {
    if (currentSum <= 2 * 60 * 1000) {
      timerWrapper.classList.add("green");
    } else if (currentSum <= startSum * 0.25) {
      timerWrapper.classList.add("yellow");
    } else if (currentSum <= startSum * 0.5) {
      timerWrapper.classList.add("orange");
    } else {
      timerWrapper.classList.add("red");
    }
  }

  const stopTimerButton = document.querySelector(".timer-stop-button");
  stopTimerButton.classList.remove("hidden");
  stopTimerButton.classList.add("timer-stop-button-active");

  if (
    plannedTimeHours === 0 &&
    plannedTimeMinutes === 0 &&
    plannedTimeSeconds === 0
  ) {
    clearInterval(startTimer);

    timerWrapper.classList.remove("green", "yellow", "orange", "red");

    return;
  }

  plannedTimeSeconds--;

  if (plannedTimeSeconds < 0) {
    plannedTimeSeconds = 59;
    plannedTimeMinutes--;
  }

  if (plannedTimeMinutes < 0) {
    plannedTimeMinutes = 59;
    plannedTimeHours--;
  }

  if (plannedTimeHours < 0) {
    plannedTimeHours = 0;
  }

  hours.textContent = formatNumber(plannedTimeHours);
  minutes.textContent = formatNumber(plannedTimeMinutes);
  seconds.textContent = formatNumber(plannedTimeSeconds);
}
export function initializeTimerFunctionality() {
  setTimer();

  let timer;
  const openedModal = document.querySelector(".timer");
  timerWrapper = document.querySelector(".timer-wrapper");

  const timerButtonClose = document.querySelector(".timer-button-close");
  const timerButton = document.querySelector(".timer-button");
  const stopTimerButton = document.querySelector(".timer-stop-button");
  const hoursInput = document.querySelector("#hours");
  const minutesInput = document.querySelector("#minutes");
  const secondsInput = document.querySelector("#seconds");
  const hours = document.querySelector(".hours");
  const minutes = document.querySelector(".minutes");
  const seconds = document.querySelector(".seconds");

  function isValidTimeInput() {
    const hoursValue = parseInt(hoursInput.value) || 0;
    const minutesValue = parseInt(minutesInput.value) || 0;
    const secondsValue = parseInt(secondsInput.value) || 0;

    return hoursValue > 0 || minutesValue > 0 || secondsValue > 0;
  }

  timerButton.addEventListener("click", function () {
    if (!isValidTimeInput()) {
      alert("Please enter a valid time.");
      return;
    }

    const modalWindow = document.querySelector(".modal");
    const backdrop = document.querySelector(".modal-backdrop");
    const timerHeading = document.querySelector(".timer-heading");

    if (!timerIsRunning) {
      timerIsRunning = true;
      timer = setInterval(startTimer, 1000);
      hoursInput.classList.add("hidden");
      minutesInput.classList.add("hidden");
      secondsInput.classList.add("hidden");
      timerButton.classList.add("hidden");
      timerButtonClose.classList.add("hidden");
      openedModal.classList.add("timer-active");
      timerHeading.classList.add("hidden");
      timerWrapper.classList.add("red");

      if (modalWindow && modalWindow.parentNode) {
        document.body.removeChild(modalWindow);
      }
      if (backdrop && backdrop.parentNode) {
        document.body.removeChild(backdrop);
      }
    }
  });

  stopTimerButton.addEventListener("click", function () {
    clearInterval(timer);
    timerIsRunning = false;

    hoursInput.classList.remove("hidden");
    minutesInput.classList.remove("hidden");
    secondsInput.classList.remove("hidden");
    timerButton.classList.remove("hidden");
    timerButtonClose.classList.remove("hidden");
    openedModal.classList.remove("timer-active");
    stopTimerButton.classList.remove("timer-stop-button-active");

    hours.textContent = "00";
    minutes.textContent = "00";
    seconds.textContent = "00";
    timerWrapper.classList.remove("green", "yellow", "orange", "red");

    hoursInput.value = "";
    minutesInput.value = "";
    secondsInput.value = "";

    const audio = document.querySelector("#timer-audio");
    if (audio) {
      audio.pause();
      audio.currentTime = 0;
    }
    audio.play();

    console.log("Timer stopped by user");

    if (openedModal && openedModal.parentNode) {
      document.body.removeChild(openedModal);
    }
  });

  timerButtonClose.addEventListener("click", function () {
    if (openedModal && openedModal.parentNode) {
      document.body.removeChild(openedModal);
    }
  });
}
