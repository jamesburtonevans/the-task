import { questions } from "./questions.js";
let progress = 0;
let currentQuestion = 1;
let totalQuestions = questions.length;
let answeredQuestions = 0;

export function getProgress() {
  return progress;
}

export function incrementProgress() {
  answeredQuestions++;
  progress = progress + (1.0 / (totalQuestions + 1)) * 100;
  progress = Math.round(progress);
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function getRandomNumber(min, max) {
  return Math.random() * (max - min) + min;
}

export async function changeOnQuestion() {
  if (answeredQuestions === 2) {
    await sleep(getRandomNumber(4000, 8000));
    breakBorderRadius();
    breakFontFamily();
  }

  if (answeredQuestions === 8) {
    changeQuestionFirst();
  }
}

//consistent changes//
// full break
const styleFullBreak = document.createElement("link");
styleFullBreak.rel = "stylesheet";
styleFullBreak.id = "full-break";
styleFullBreak.href = "./style-states/full-break.css";
document.head.appendChild(styleFullBreak);
document.getElementById("full-break").disabled = true;




async function breakBorderRadius() {
  const stylesheet = document.createElement("link");
  stylesheet.rel = "stylesheet";
  stylesheet.id = "break-border-radius";
  stylesheet.href = "./style-states/break-border-radius.css";
  document.head.appendChild(stylesheet);
  let i = 0;
  while (i === 0) {
    document.getElementById("break-border-radius").disabled = true;
    await sleep(getRandomNumber(2000, 8000));
    document.getElementById("break-border-radius").disabled = false;
    await sleep(1);
  }
}

async function breakFontFamily() {
  const stylesheet = document.createElement("link");
  stylesheet.rel = "stylesheet";
  stylesheet.id = "break-font-family";
  stylesheet.href = "./style-states/break-font-family.css";
  document.head.appendChild(stylesheet);
  let i = 0;
  while (i === 0) {
    document.getElementById("break-font-family").disabled = true;
    await sleep(getRandomNumber(2000, 8000));
    document.getElementById("break-font-family").disabled = false;
    await sleep(1);
  }
}

async function changeQuestionFirst() {
  const stylesheet = document.createElement("link");
  stylesheet.rel = "stylesheet";
  stylesheet.id = "change-01";
  stylesheet.href = "./style-states/change-01.css";

  const targetDiv = document.getElementById(`question-9`);
  const targetDivText = targetDiv.querySelector(".question-text");
  await sleep(1500);
  targetDivText.textContent = questions[8].alteredText;
  await sleep(50);
  document.getElementById("full-break").disabled = false;
  targetDivText.textContent = questions[8].text;
  await sleep(50);
  targetDivText.textContent = questions[8].alteredText;
  targetDiv.style["background-color"] = 'black';
  document.head.appendChild(stylesheet);
  await sleep(50);
  targetDiv.style["background-color"] = 'var(--color-background)';
  document.getElementById("full-break").disabled = true;
}
