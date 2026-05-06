import { questions } from "./questions.js";
import { renderFinalQuestion } from "./renderer.js";

let progress = 0;
let currentQuestion = 1;
let totalQuestions = questions.length;
let answeredQuestions = 0;

let rapidChange = false;
let reachedEnd = false;
let allStripped = false;

export function getProgress() {
  return progress;
}

export function incrementProgress() {
  answeredQuestions++;
  progress = progress + (1 / (totalQuestions) *100);
  progress = Math.round(progress);
  if (progress > 100) {
    progress = 100;
  }
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function getRandomNumber(min, max) {
  return Math.random() * (max - min) + min;
}

export async function changeOnQuestion() {
  /// TEST CASE ///
  if (answeredQuestions === 0) {
    //
  }
  /////////////////

  if (answeredQuestions === 2) {
    await sleep(getRandomNumber(2000, 4000));
    breakBorderRadius();
    breakFontFamily();
  }

  if (answeredQuestions === 5) {
    await sleep(getRandomNumber(2000, 4000));
    breakFontFamilyMono();
  }

  if (answeredQuestions === 8) {
    changeQuestionFirst();
  }

  if (answeredQuestions === 8) {
    await sleep(getRandomNumber(2000, 4000));
    breakTextAllCaps();
  }

  if (answeredQuestions === 10) {
    await sleep(getRandomNumber(500, 2000));
    rapidQuestionChange();
  }

  if (answeredQuestions === 13) {
    await sleep(getRandomNumber(500, 2000));
    endFlicker();
  }

  if (allStripped === true) {
    //
  }
}

export async function lastQuestionSubmit() {
  rapidChange = false;
  await sleep(2000);
  window.scrollTo(0, 0);
  document.getElementById("full-break").disabled = false;
  await sleep(2000);
  createFullBreak();
  setAlternativeQuestions();
  reachedEnd = true;

  await stripAwayPage();

  await sleep(1000);

  const finalQuestion = renderFinalQuestion();
  document.querySelector('main').appendChild(finalQuestion);
  await sleep(15000);

  document.querySelector('main').remove(finalQuestion);

}

//consistent changes//
const styleSemiBreak = document.createElement("link");
styleSemiBreak.rel = "stylesheet";
styleSemiBreak.id = "semi-break";
styleSemiBreak.href = "./style-states/full-break.css";
document.head.appendChild(styleSemiBreak);
document.getElementById("semi-break").disabled = true;

function createFullBreak() {
  const styleFullBreak = document.createElement("link");
  styleFullBreak.rel = "stylesheet";
  styleFullBreak.id = "full-break";
  styleFullBreak.href = "./style-states/full-break.css";
  document.body.appendChild(styleFullBreak);
  document.getElementById("full-break").disabled = true;
}

createFullBreak();

async function breakBorderRadius() {
  const stylesheet = document.createElement("link");
  stylesheet.rel = "stylesheet";
  stylesheet.id = "break-border-radius";
  stylesheet.href = "./style-states/break-border-radius.css";
  document.head.appendChild(stylesheet);
  let i = 0;
  while (i === 0 && reachedEnd === false) {
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
  while (i === 0 && reachedEnd === false) {
    document.getElementById("break-font-family").disabled = true;
    await sleep(getRandomNumber(2000, 8000));
    document.getElementById("break-font-family").disabled = false;
    await sleep(50);
  }
}

async function breakFontFamilyMono() {
  const stylesheet = document.createElement("link");
  stylesheet.rel = "stylesheet";
  stylesheet.id = "break-font-family-mono";
  stylesheet.href = "./style-states/break-font-family-mono.css";
  document.head.appendChild(stylesheet);
  let i = 0;
  while (i === 0 && reachedEnd === false) {
    document.getElementById("break-font-family-mono").disabled = true;
    await sleep(getRandomNumber(200, 2500));
    document.getElementById("break-font-family-mono").disabled = false;
    await sleep(getRandomNumber(1, 50));
  }
}

async function breakTextAllCaps() {
  const stylesheet = document.createElement("link");
  stylesheet.rel = "stylesheet";
  stylesheet.id = "break-text-allcaps";
  stylesheet.href = "./style-states/break-text-allcaps.css";
  document.head.appendChild(stylesheet);
  let i = 0;
  while (i === 0 && reachedEnd === false) {
    document.getElementById("break-text-allcaps").disabled = true;
    await sleep(getRandomNumber(50, 1000));
    document.getElementById("break-text-allcaps").disabled = false;
    await sleep(getRandomNumber(1, 50));
  }
}

async function endFlicker() {
  let i = 0;
  while (i === 0 && reachedEnd === false) {
    await sleep(50);
    document.getElementById("semi-break").disabled = true;
    await sleep(getRandomNumber(5, 6000));
    document.getElementById("semi-break").disabled = false;
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
  targetDiv.style["background-color"] = 'black';
  targetDivText.textContent = questions[8].alteredText;
  await sleep(150);
  document.getElementById("semi-break").disabled = false;
  targetDivText.textContent = questions[8].text;
  await sleep(150);
  targetDivText.textContent = questions[8].alteredText;
  targetDiv.style["background-color"] = 'black';
  document.body.appendChild(stylesheet);
  await sleep(150);
  targetDiv.style["background-color"] = 'var(--color-background)';
  document.getElementById("semi-break").disabled = true;
}

async function rapidQuestionChange() {
  rapidChange = true;
  while (rapidChange === true) {
    let j = 1;
    while (j < questions.length) {
      const targetDiv = document.getElementById(`question-${j}`);
      const targetDivText = targetDiv.querySelector(".question-text");
      if (j != 9) {
        await sleep(getRandomNumber(5, 25));
        targetDivText.textContent = questions[j-1].alteredText;
        swapOptions(targetDiv, questions[j-1], true);
        await sleep(getRandomNumber(45, 250));
        targetDivText.textContent = questions[j-1].text;
        swapOptions(targetDiv, questions[j-1], false);
      }
      j++;
    }
    await sleep(25);
  }
}

function setAlternativeQuestions() {
  let j = 1;
  while (j < questions.length) {
    const targetDiv = document.getElementById(`question-${j}`);
    const targetDivText = targetDiv.querySelector(".question-text");
    targetDivText.textContent = questions[j - 1].alteredText;
    swapOptions(targetDiv, questions[j - 1], true);
    j++;
  }
}

async function stripAwayPage() {
  const main = document.querySelector('main');
  if (!main || allStripped) return;

  async function stripElement(el) {
    for (const child of [...el.children]) {
      await stripElement(child);
    }
    if (el !== main) {
      await sleep(getRandomNumber(200, 800));
      el.remove();
    }
  }
  await stripElement(main);
  allStripped = true;
}

function swapOptions(containerDiv, question, useAltered) {
  if (!question.alteredOptions) return;
  const optionTexts = containerDiv.querySelectorAll(".answer-choice-text");
  const source = useAltered ? question.alteredOptions : question.options;
  optionTexts.forEach((el, i) => {
    if (source[i] !== undefined) el.textContent = source[i];
  });
}
