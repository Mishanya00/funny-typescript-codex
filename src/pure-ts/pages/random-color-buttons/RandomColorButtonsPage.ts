import { getRandomHslColor } from '../../../shared/random';
import type { PageDefinition, PageRenderProps } from '../../types';
import './RandomColorButtonsPage.css';

export const randomColorButtonsPage: PageDefinition = {
  id: 'random-color-buttons',
  title: 'Random Color Buttons',
  description: 'Press any button to replace its color with a new random one.',
  render: renderRandomColorButtonsPage,
};

function renderRandomColorButtonsPage({ onBack }: PageRenderProps): HTMLElement {
  const page = document.createElement('main');
  page.className = 'app-shell color-page';

  const nav = document.createElement('nav');
  nav.className = 'page-nav';
  nav.setAttribute('aria-label', 'Page navigation');

  const backButton = document.createElement('button');
  backButton.className = 'back-button';
  backButton.type = 'button';
  backButton.textContent = '<- Back to menu';
  backButton.addEventListener('click', onBack);
  nav.append(backButton);

  const header = document.createElement('section');
  header.className = 'page-header';

  const heading = document.createElement('h1');
  heading.textContent = randomColorButtonsPage.title;

  const description = document.createElement('p');
  description.textContent = randomColorButtonsPage.description;

  header.append(heading, description);

  const buttonGrid = document.createElement('section');
  buttonGrid.className = 'color-grid';
  buttonGrid.setAttribute('aria-label', 'Random color buttons');

  for (let index = 1; index <= 10; index += 1) {
    buttonGrid.append(createColorButton(index));
  }

  page.append(nav, header, buttonGrid);
  return page;
}

function createColorButton(index: number): HTMLButtonElement {
  const button = document.createElement('button');
  button.className = 'color-button';
  button.type = 'button';
  button.textContent = `Button ${index}`;
  applyRandomColor(button);

  button.addEventListener('click', () => {
    applyRandomColor(button);
  });

  return button;
}

function applyRandomColor(button: HTMLButtonElement): void {
  const color = getRandomHslColor();
  button.style.backgroundColor = color.background;
  button.style.color = color.text;
}
