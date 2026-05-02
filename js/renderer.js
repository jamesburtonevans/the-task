import { getProgress, incrementProgress, changeOnQuestion } from "./state.js";

// Render question
export function renderQuestion(question) {
  const container = document.createElement("div");
  const questionId = document.createElement("p");
  const questionText = document.createElement("h3");
  const answerText = document.createElement("p");
  const input = document.createElement("input");
  const textarea = document.createElement("textarea");
  const answerContainer = document.createElement("div");
  const submitButton = document.createElement("button");
  const textContainer = document.createElement("div");

  container.className = "question-container";
  questionId.className = "question-id";
  questionText.className = "question-text";
  answerText.className = "answer-text";
  input.className = "input";
  textarea.className = "textarea";
  textarea.setAttribute("rows", 1);
  submitButton.className = "submit-button";
  textContainer.className = "text-container";
  answerContainer.className = "answer-container";

  let selectedAnswer = null;

  // Handle options for multiple-choice questions
  if (question.options) {
    question.options.forEach((option) => {
      const answerChoice = document.createElement("div");
      const answerChoiceText = document.createElement("p");
      const answerChoiceCheck = document.createElement("div");

      answerChoice.className = "answer-choice";
      answerChoiceText.className = "answer-choice-text";
      answerChoiceCheck.className = "answer-choice-check";

      answerChoiceText.textContent = option;

      answerChoice.appendChild(answerChoiceCheck);
      answerChoice.appendChild(answerChoiceText);

      if (option === question.answer) {
        answerChoice.classList.add("selected");
      }

      //if (selectedAnswer === null) {
      answerChoice.addEventListener("click", function () {
        selectedAnswer = option;
        answerContainer.querySelectorAll("div").forEach(function (el) {
          el.classList.remove("selected");
        });
        answerChoice.classList.add("selected");
      });

      answerContainer.appendChild(answerChoice);
    });
  }

  // textarea input
  textarea.addEventListener("input", function () {
    this.style.height = "auto";
    this.style.height = this.scrollHeight + "px";
  });

  // Set input type
  if (question.answerType == "free-response") {
    input.type = "text";
  } else if (question.answerType == "multiple-choice") {
    input.type = "checkbox";
  }

  questionId.textContent = `#${question.id}.`;
  questionText.textContent = question.text;
  submitButton.textContent = "Submit";

  textContainer.appendChild(questionText);
  container.appendChild(questionId);
  container.appendChild(textContainer);

  // Add appropriate elements to answer type
  if (question.answer == null) {
    if (question.answerType == "free-response") {
      textContainer.appendChild(textarea);
      container.appendChild(submitButton);
    } else if (question.answerType == "multiple-choice") {
      textContainer.appendChild(answerContainer);
      container.appendChild(submitButton);
    }
  } else {
    if (question.answerType == "free-response") {
      textContainer.appendChild(answerText);
    } else if (question.answerType == "multiple-choice") {
      answerContainer.classList.add("locked");
      textContainer.appendChild(answerContainer);
    }
  }

  // Handle submit button behavior
  submitButton.addEventListener("click", function () {
    // Run change on target questions
    if (question.answerType === "free-response") {
      if (textarea.value.length < 1) {
        console.log("Please provide an answer");
        return;
      } else {
        question.answer = textarea.value;
        container.classList.remove('active');
        submitButton.classList.add('hidden');
        textarea.classList.add('hidden');
        answerText.textContent = question.answer;
        textContainer.appendChild(answerText);
        changeOnQuestion();
        incrementProgress();
        updateProgress();
      }
    }
    if (question.answerType === "multiple-choice") {
      if (selectedAnswer === null) {
        console.log("Please select an answer");
        return;
      } else {
        question.answer = selectedAnswer;
        container.classList.remove('active');
        submitButton.classList.add('hidden');
        changeOnQuestion();
        incrementProgress();
        updateProgress();
      }
    }

    // Reveal next question
    let nextActive = null;
    const next = container.nextElementSibling;
    if (next) {
      next.classList.remove("hidden");
      next.classList.add("slide-in");
      next.classList.add("active");
      nextActive = next;
    } else {
      const nextSection = container.parentElement?.nextElementSibling;
      if (nextSection) {
        nextSection.querySelector(".section-title").classList.remove("hidden");
        nextSection.querySelector(".section-title").classList.add("slide-in");
        const firstInNext = nextSection.querySelector(".question-container");
        if (firstInNext) {
          firstInNext.classList.remove("hidden");
          firstInNext.classList.add("slide-in");
          firstInNext.classList.add("active");
          nextActive = firstInNext;
        }
      }
    }
    if (nextActive) {
      nextActive.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  });

  return container;
}

// Add questions into sections
export function addQuestionsToSections(questions) {
  const wrapper = document.createElement("div");
  wrapper.className = "sections-container";

  const sectionMap = new Map();

  questions.forEach(function (question) {
    if (!sectionMap.has(question.section)) {
      const sectionEl = document.createElement("div");

      //format sectionClass name
      let sectionClass = `${question.section}`;
      sectionClass = sectionClass.toLowerCase();
      sectionClass = sectionClass.replace(/\s/g, "-");

      sectionEl.className = sectionClass;
      const sectionTitle = document.createElement("h4");
      sectionTitle.className = "section-title hidden";
      sectionTitle.textContent = question.section;
      sectionEl.appendChild(sectionTitle);
      sectionMap.set(question.section, sectionEl);
      wrapper.appendChild(sectionEl);
    }
    const el = renderQuestion(question);
    el.classList.add("hidden");
    el.id = `question-${question.id}`;
    sectionMap.get(question.section).appendChild(el);
  });

  return wrapper;
}

// Render start button
export function renderStartButton(questionsContainer) {
  const startContainer = document.createElement("div");
  const instructionalText = document.createElement("p");
  const startText = document.createElement("h3");
  const button = document.createElement("button");

  instructionalText.className = "instructional";
  instructionalText.textContent = `You will be prompted with a variety of personal questions. In order for the test to properly register your responses, do not restate the question inside of your answer. For example, the answer to "What color is the sky" would just be Blue.`;
  startContainer.className = "start";
  startText.textContent = "Are you ready to begin?";
  button.className = "start-button";
  button.textContent = "Start";
  startContainer.appendChild(instructionalText);
  startContainer.appendChild(startText);
  startContainer.appendChild(button);
  button.addEventListener("click", function () {
    startContainer.remove();
    document.querySelector(".progress-container").classList.remove("hidden");
    const first = questionsContainer.querySelector(".question-container");
    if (first) {
      first.parentElement
        .querySelector(".section-title")
        .classList.remove("hidden");
      first.parentElement
        .querySelector(".section-title")
        .classList.add("slide-in");
      first.classList.remove("hidden");
      first.classList.add("slide-in");
      first.classList.add("active");
      first.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  });
  return startContainer;
}

// Render progress
export function renderProgress() {
  const container = document.createElement("div");
  container.className = "progress";
  const progressNumber = document.createElement("p");
  container.appendChild(progressNumber);
  progressNumber.textContent = `${getProgress()}%`;
  const progressBar = document.createElement("div");
  progressBar.className = "progress-bar";
  const barComplete = document.createElement("div");
  barComplete.className = "bar-complete";
  barComplete.style.width = `${getProgress()}%`;
  progressBar.appendChild(barComplete);
  container.appendChild(progressBar);

  return container;
}

function updateProgress() {
  const progressNumber = document.querySelector(".progress p");
  progressNumber.textContent = `${getProgress()}%`;
  document.querySelector(".bar-complete").style.width = `${getProgress()}%`;
}
