import { renderProgress } from './renderer.js';

export function renderHeader() {
    const container = document.createElement('div');
    const title = document.createElement('h1');
    const subtitle = document.createElement('h2');

    container.className = "title-container";

    title.textContent = "The Task";
    subtitle.textContent = "Discover your True purpose in just 5 minutes";

    container.appendChild(title);
    container.appendChild(subtitle);
    return container;
}

export function renderProgressDiv() {
    const container = document.createElement('div');
    container.className = "progress-container";
    container.classList.add('hidden');
    container.appendChild(renderProgress());
    return container;
}

export function mobileWarning() {
  const container = document.createElement('div');
  container.className = "mobile-warning";
  const warning = document.createElement('p');
  warning.textContent = "This experience is not intended for mobile/smaller screens. Please use a desktop to get the full experience.";
  container.appendChild(warning);
  return container;
}
