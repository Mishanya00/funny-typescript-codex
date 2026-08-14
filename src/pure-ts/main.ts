import { createMainMenu } from './components/MainMenu';
import { movingColorButtonPage } from './pages/moving-color-button/MovingColorButtonPage';
import { randomColorButtonsPage } from './pages/random-color-buttons/RandomColorButtonsPage';
import './styles/global.css';

const appElement = document.querySelector<HTMLDivElement>('#app');

if (!appElement) {
  throw new Error('Application root element was not found.');
}

const app = appElement;
const pixelColorButtonsPage = {
  id: 'pixel-color-buttons',
  title: 'Pixel Color Buttons',
  description: 'Open the React pixel-art version of the colored buttons.',
  render: () => {
    window.location.assign('/react.html?page=pixel-color-buttons');
    return document.createElement('main');
  },
};

const pages = [randomColorButtonsPage, movingColorButtonPage, pixelColorButtonsPage];

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
