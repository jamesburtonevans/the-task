import { renderHeader } from './static.js';
import { renderProgressDiv } from './static.js';
import { questions } from './questions.js';
import { addQuestionsToSections, renderStartButton, renderProgress } from './renderer.js';

const main = document.querySelector('main');
const questionsContainer = addQuestionsToSections(questions);

main.appendChild(renderHeader());
main.appendChild(renderProgressDiv());
main.appendChild(renderStartButton(questionsContainer));
main.appendChild(questionsContainer);