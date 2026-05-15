// QUOTES

const quotes = [

  "rainy hear act city fire clean other south board heavy mark cat she sleep lamp art any apple blood island about on piano big rainy another skin food rude toe obey board deer rice car shoot bank every stamp wear",

  "javascript html and css are essential technologies for creating beautiful websites and interactive applications for users around the world",

  "practice typing every day to improve your typing speed typing accuracy and overall productivity while working on projects"
];

// ELEMENTS

const quoteElement = document.getElementById("quote");
const inputElement = document.getElementById("input");
const timeElement = document.getElementById("time");
const wpmElement = document.getElementById("wpm");
const accuracyElement = document.getElementById("accuracy");
const incorrectElement = document.getElementById("incorrect");

const restartBtn = document.getElementById("restart");
const resultElement = document.getElementById("result");

const timeLimitBtn = document.getElementById("timeLimitBtn");
const timerModeBtn = document.getElementById("timerModeBtn");

const timerLabel = document.getElementById("timerLabel");

const timeButtons =
  document.querySelectorAll(".time-btn");

// VARIABLES

let timer = 30;
let interval = null;
let started = false;
let currentQuote = "";
let mode = "limit";

// LOAD QUOTE

function loadQuote(){

  currentQuote =
    quotes[Math.floor(Math.random() * quotes.length)];

  quoteElement.innerHTML = "";

  currentQuote.split("").forEach(char => {

    const span = document.createElement("span");

    span.innerText = char;

    quoteElement.appendChild(span);

  });

  quoteElement.querySelector("span")
    .classList.add("active");
}

// START TIMER

function startTimer(){

  clearInterval(interval);

  interval = setInterval(() => {

    if(mode === "limit"){

      timer--;

      timeElement.innerText = timer;

      if(timer <= 0){
        finishTest();
      }

    }else{

      timer++;

      timeElement.innerText = timer;
    }

  },1000);
}

// FINISH TEST

function finishTest(){

  clearInterval(interval);

  inputElement.disabled = true;

  const correctChars =
    document.querySelectorAll(".correct").length;

  let minutes;

  if(mode === "limit"){

    const selectedTime =
      parseInt(
        document.querySelector(".time-btn.active")
        .dataset.time
      );

    minutes = (selectedTime - timer) / 60;

  }else{

    minutes = timer / 60;
  }

  const finalWPM =
    minutes > 0
      ? Math.round((correctChars / 5) / minutes)
      : 0;

  wpmElement.innerText = finalWPM;

  if(mode === "limit"){

    resultElement.innerHTML =
      `Time Over!<br>Your Speed: ${finalWPM} WPM`;

  }else{

    resultElement.innerHTML =
      `Completed in ${timer} seconds<br>
       Speed: ${finalWPM} WPM`;
  }
}

// INPUT EVENT

inputElement.addEventListener("input", () => {

  if(!started){

    started = true;

    startTimer();
  }

  if(inputElement.value.length > currentQuote.length){

    inputElement.value =
      inputElement.value.slice(0, currentQuote.length);
  }

  const characters =
    quoteElement.querySelectorAll("span");

  const typedChars =
    inputElement.value.split("");

  let correctChars = 0;

  characters.forEach((charSpan,index) => {

    const typedChar = typedChars[index];

    if(typedChar == null){

      charSpan.classList.remove(
        "correct","incorrect"
      );

    }else if(
      typedChar === charSpan.innerText
    ){

      charSpan.classList.add("correct");

      charSpan.classList.remove("incorrect");

      correctChars++;

    }else{

      charSpan.classList.add("incorrect");

      charSpan.classList.remove("correct");
    }
  });

  characters.forEach(span =>
    span.classList.remove("active")
  );

  if(characters[typedChars.length]){

    characters[typedChars.length]
      .classList.add("active");
  }

  const accuracy =
    typedChars.length > 0
      ? Math.round(
          (correctChars / typedChars.length) * 100
        )
      : 100;

  accuracyElement.innerText =
    accuracy + "%";

  let incorrectWords = 0;

  const originalWords =
    currentQuote.split(" ");

  const typedWords =
    inputElement.value.trim().split(" ");

  typedWords.forEach((word,index) => {

    if(
      word &&
      originalWords[index] &&
      word !== originalWords[index]
    ){

      incorrectWords++;
    }
  });

  incorrectElement.innerText =
    incorrectWords;

  let minutes;

  if(mode === "limit"){

    const selectedTime =
      parseInt(
        document.querySelector(".time-btn.active")
        .dataset.time
      );

    minutes =
      (selectedTime - timer) / 60;

  }else{

    minutes = timer / 60;
  }

  const wpm =
    minutes > 0
      ? Math.round(
          (correctChars / 5) / minutes
        )
      : 0;

  wpmElement.innerText = wpm;

  if(
    typedChars.length === currentQuote.length
  ){

    finishTest();
  }

});

// RESET TEST

function resetTest(){

  clearInterval(interval);

  started = false;

  timer =
    mode === "limit"
      ? parseInt(
          document.querySelector(".time-btn.active")
          .dataset.time
        )
      : 0;

  timeElement.innerText = timer;

  wpmElement.innerText = 0;

  accuracyElement.innerText = "100%";

  incorrectElement.innerText = 0;

  inputElement.disabled = false;

  inputElement.value = "";

  resultElement.innerHTML = "";

  loadQuote();
}

// RESTART

restartBtn.addEventListener(
  "click",
  resetTest
);

// TIME LIMIT MODE

timeLimitBtn.addEventListener("click", () => {

  mode = "limit";

  timeLimitBtn.classList.add("active");

  timerModeBtn.classList.remove("active");

  timerLabel.innerText = "Time Left";

  document.getElementById("timeOptions")
    .style.display = "block";

  resetTest();
});

// TIMER MODE

timerModeBtn.addEventListener("click", () => {

  mode = "timer";

  timerModeBtn.classList.add("active");

  timeLimitBtn.classList.remove("active");

  timerLabel.innerText = "Time Taken";

  document.getElementById("timeOptions")
    .style.display = "none";

  resetTest();
});

// TIME BUTTONS

timeButtons.forEach(button => {

  button.addEventListener("click", () => {

    timeButtons.forEach(btn =>
      btn.classList.remove("active")
    );

    button.classList.add("active");

    timer =
      parseInt(button.dataset.time);

    timeElement.innerText = timer;

    resetTest();
  });
});

// INITIAL LOAD

loadQuote();