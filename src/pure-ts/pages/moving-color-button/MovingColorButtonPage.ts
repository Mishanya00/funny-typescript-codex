import { getRandomHslColor, getRandomViewportPosition } from '../../../shared/random';
import type { PageDefinition, PageRenderProps } from '../../types';
import './MovingColorButtonPage.css';

export const movingColorButtonPage: PageDefinition = {
  id: 'moving-color-button',
  title: 'Moving Color Button',
  description: 'Click the button to send it to a random screen position and give it a new color.',
  render: renderMovingColorButtonPage,
};

function renderMovingColorButtonPage({ onBack }: PageRenderProps): HTMLElement {
  const page = document.createElement('main');
  page.className = 'moving-page';

  const nav = document.createElement('nav');
  nav.className = 'floating-page-nav';
  nav.setAttribute('aria-label', 'Page navigation');

  const backButton = document.createElement('button');
  backButton.className = 'back-button';
  backButton.type = 'button';
  backButton.textContent = '<- Back to menu';
  backButton.addEventListener('click', onBack);
  nav.append(backButton);

  const header = document.createElement('section');
  header.className = 'floating-page-header';

  const heading = document.createElement('h1');
  heading.textContent = movingColorButtonPage.title;

  const description = document.createElement('p');
  description.textContent = movingColorButtonPage.description;

  header.append(heading, description);

  const movingButton = document.createElement('button');
  movingButton.className = 'moving-color-button';
  movingButton.type = 'button';
  movingButton.textContent = 'Catch me';

  const moveAndRecolorButton = () => {
    const buttonRect = movingButton.getBoundingClientRect();
    const position = getRandomViewportPosition(buttonRect.width, buttonRect.height);
    const color = getRandomHslColor();

    movingButton.style.left = `${position.x}px`;
    movingButton.style.top = `${position.y}px`;
    movingButton.style.backgroundColor = color.background;
    movingButton.style.color = color.text;
  };

  movingButton.addEventListener('click', moveAndRecolorButton);
  page.append(nav, header, movingButton);

  requestAnimationFrame(moveAndRecolorButton);

  return page;
}
