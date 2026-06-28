import '../styles/pure.css';

type PageDefinition = {
  id: string;
  title: string;
  description: string;
  render: () => HTMLElement;
};

const appElement = document.querySelector<HTMLDivElement>('#app');

if (!appElement) {
  throw new Error('Application root element was not found.');
}

const app = appElement;

const colorPage: PageDefinition = {
  id: 'color-buttons',
  title: 'Random Color Buttons',
  description: 'Press any button to replace its color with a new random one.',
  render: renderColorButtonsPage,
};

const pages: PageDefinition[] = [colorPage];

renderMainMenu();

function renderMainMenu(): void {
  app.replaceChildren(createMainMenu());
}

function renderPage(page: PageDefinition): void {
  app.replaceChildren(page.render());
}

function createMainMenu(): HTMLElement {
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
    card.addEventListener('click', () => renderPage(page));

    const cardTitle = document.createElement('span');
    cardTitle.className = 'page-card__title';
    cardTitle.textContent = page.title;

    const cardDescription = document.createElement('span');
    cardDescription.className = 'page-card__description';
    cardDescription.textContent = page.description;

    const cardHint = document.createElement('span');
    cardHint.className = 'page-card__hint';
    cardHint.textContent = 'Open page →';

    card.append(cardTitle, cardDescription, cardHint);
    cardGrid.append(card);
  });

  menu.append(hero, cardGrid);
  return menu;
}

function renderColorButtonsPage(): HTMLElement {
  const page = document.createElement('main');
  page.className = 'app-shell color-page';

  const nav = document.createElement('nav');
  nav.className = 'page-nav';
  nav.setAttribute('aria-label', 'Page navigation');

  const backButton = document.createElement('button');
  backButton.className = 'back-button';
  backButton.type = 'button';
  backButton.textContent = '← Back to menu';
  backButton.addEventListener('click', renderMainMenu);
  nav.append(backButton);

  const header = document.createElement('section');
  header.className = 'page-header';

  const heading = document.createElement('h1');
  heading.textContent = colorPage.title;

  const description = document.createElement('p');
  description.textContent = colorPage.description;

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

function getRandomHslColor(): { background: string; text: string } {
  const hue = getRandomInteger(0, 359);
  const saturation = getRandomInteger(58, 92);
  const lightness = getRandomInteger(35, 72);
  const text = lightness > 55 ? '#111827' : '#ffffff';

  return {
    background: `hsl(${hue} ${saturation}% ${lightness}%)`,
    text,
  };
}

function getRandomInteger(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
