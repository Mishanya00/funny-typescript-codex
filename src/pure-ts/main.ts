import { createMainMenu } from './components/MainMenu';
import { movingColorButtonPage } from './pages/moving-color-button/MovingColorButtonPage';
import { randomColorButtonsPage } from './pages/random-color-buttons/RandomColorButtonsPage';
import './styles/global.css';

const appElement = document.querySelector<HTMLDivElement>('#app');

if (!appElement) {
  throw new Error('Application root element was not found.');
}

const app = appElement;
const pages = [randomColorButtonsPage, movingColorButtonPage];

function renderMainMenu(): void {
  app.replaceChildren(createMainMenu({ pages, onSelect: renderPage }));
}

function renderPage(pageId: string): void {
  const page = pages.find((candidate) => candidate.id === pageId);

  if (!page) {
    renderMainMenu();
    return;
  }

  app.replaceChildren(page.render({ onBack: renderMainMenu }));
}

renderMainMenu();
