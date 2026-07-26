import { useState } from 'react';
import { MainMenu } from './components/MainMenu';
import { MovingColorButtonPage, movingColorButtonPage } from './pages/moving-color-button/MovingColorButtonPage';
import { RandomColorButtonsPage, randomColorButtonsPage } from './pages/random-color-buttons/RandomColorButtonsPage';
import type { PageDefinition } from './types';

const pages: PageDefinition[] = [randomColorButtonsPage, movingColorButtonPage];

export function App() {
  const [activePageId, setActivePageId] = useState<string | null>(null);

  if (activePageId === randomColorButtonsPage.id) {
    return <RandomColorButtonsPage onBack={() => setActivePageId(null)} />;
  }

  if (activePageId === movingColorButtonPage.id) {
    return <MovingColorButtonPage onBack={() => setActivePageId(null)} />;
  }

  return <MainMenu pages={pages} onSelect={setActivePageId} />;
}
