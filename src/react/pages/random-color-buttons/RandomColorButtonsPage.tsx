import { useState } from 'react';
import { getRandomHslColor, type HslColor } from '../../../shared/random';
import type { PageDefinition, PageProps } from '../../types';
import './RandomColorButtonsPage.css';

type ColorButton = {
  id: number;
  color: HslColor;
};

export const randomColorButtonsPage: PageDefinition = {
  id: 'random-color-buttons',
  title: 'Random Color Buttons',
  description: 'Press any button to replace its color with a new random one.',
};

export function RandomColorButtonsPage({ onBack }: PageProps) {
  const [buttons, setButtons] = useState<ColorButton[]>(() =>
    Array.from({ length: 10 }, (_, index) => ({ id: index + 1, color: getRandomHslColor() })),
  );

  const handleButtonClick = (id: number) => {
    setButtons((current) =>
      current.map((button) => (button.id === id ? { ...button, color: getRandomHslColor() } : button)),
    );
  };

  return (
    <main className="app-shell color-page">
      <nav className="page-nav" aria-label="Page navigation">
        <button className="back-button" type="button" onClick={onBack}>
          &lt;- Back to menu
        </button>
      </nav>

      <section className="page-header">
        <h1>{randomColorButtonsPage.title}</h1>
        <p>{randomColorButtonsPage.description}</p>
      </section>

      <section className="color-grid" aria-label="Random color buttons">
        {buttons.map((button) => (
          <button
            key={button.id}
            className="color-button"
            type="button"
            onClick={() => handleButtonClick(button.id)}
            style={{ backgroundColor: button.color.background, color: button.color.text }}
          >
            Button {button.id}
          </button>
        ))}
      </section>
    </main>
  );
}
