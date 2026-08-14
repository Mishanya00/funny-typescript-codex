import { useState } from 'react';
import { MainMenu } from './components/MainMenu';
import { MovingColorButtonPage, movingColorButtonPage } from './pages/moving-color-button/MovingColorButtonPage';
import { PixelColorButtonsPage, pixelColorButtonsPage } from './pages/pixel-color-buttons/PixelColorButtonsPage';
import { RandomColorButtonsPage, randomColorButtonsPage } from './pages/random-color-buttons/RandomColorButtonsPage';
import type { PageDefinition } from './types';

const pages: PageDefinition[] = [randomColorButtonsPage, movingColorButtonPage, pixelColorButtonsPage];

export function App() {
  const [activePageId, setActivePageId] = useState<string | null>(() => {
    const requestedPage = new URLSearchParams(window.location.search).get('page');

    return requestedPage === pixelColorButtonsPage.id ? requestedPage : null;
  });

  if (activePageId === randomColorButtonsPage.id) {
    return <RandomColorButtonsPage onBack={() => setActivePageId(null)} />;
  }

  if (activePageId === movingColorButtonPage.id) {
    return <MovingColorButtonPage onBack={() => setActivePageId(null)} />;
  }

  if (activePageId === pixelColorButtonsPage.id) {
    return <PixelColorButtonsPage onBack={() => setActivePageId(null)} />;
  }

  return <MainMenu pages={pages} onSelect={setActivePageId} />;
}
