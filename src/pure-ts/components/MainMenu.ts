import type { PageDefinition } from '../types';
import './MainMenu.css';

type MainMenuProps = {
  pages: PageDefinition[];
  onSelect: (pageId: string) => void;
};

export function createMainMenu({ pages, onSelect }: MainMenuProps): HTMLElement {
  const menu = document.createElement('main');
  menu.className = 'app-shell';

  const hero = document.createElement('section');
  hero.className = 'hero';

  const eyebrow = document.createElement('p');
  eyebrow.className = 'eyebrow';
  eyebrow.textContent = 'Main menu';

  const heading = document.createElement('h1');
  heading.textContent = 'Choose a page';

  const intro = document.createElement('p');
  intro.className = 'hero-text';
  intro.textContent =
    'Pick a card to open a small TypeScript page or minigame. More cards can be added here as the project grows.';

  hero.append(eyebrow, heading, intro);

  const cardGrid = document.createElement('section');
  cardGrid.className = 'card-grid';
  cardGrid.setAttribute('aria-label', 'Available pages');

  pages.forEach((page) => {
    const card = document.createElement('button');
    card.className = 'page-card';
    card.type = 'button';
    card.addEventListener('click', () => onSelect(page.id));

    const cardTitle = document.createElement('span');
    cardTitle.className = 'page-card__title';
    cardTitle.textContent = page.title;

    const cardDescription = document.createElement('span');
    cardDescription.className = 'page-card__description';
    cardDescription.textContent = page.description;

    const cardHint = document.createElement('span');
    cardHint.className = 'page-card__hint';
    cardHint.textContent = 'Open page ->';

    card.append(cardTitle, cardDescription, cardHint);
    cardGrid.append(card);
  });

  menu.append(hero, cardGrid);
  return menu;
}
