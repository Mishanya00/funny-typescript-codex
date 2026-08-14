import { useState, type CSSProperties } from 'react';
import { getRandomHslColor, type HslColor } from '../../../shared/random';
import type { PageDefinition, PageProps } from '../../types';
import './PixelColorButtonsPage.css';

type PixelButtonDefinition = {
  id: number;
  label: string;
  icon?: string;
  size?: 'wide' | 'normal';
};

type PixelButtonState = PixelButtonDefinition & {
  color: HslColor;
};

const pixelButtonDefinitions: PixelButtonDefinition[] = [
  { id: 1, label: 'Quit', size: 'wide' },
  { id: 2, label: 'Pause', icon: 'Ⅱ' },
  { id: 3, label: 'Close', icon: '×' },
  { id: 4, label: 'Gear', icon: '⚙' },
  { id: 5, label: 'Home', icon: '⌂' },
  { id: 6, label: 'Undo', icon: '↶' },
  { id: 7, label: 'Reset', size: 'wide' },
  { id: 8, label: 'Search', icon: '⌕' },
  { id: 9, label: 'Load', icon: '▣' },
  { id: 10, label: 'Settings', size: 'wide' },
  { id: 11, label: 'Keyboard', icon: '▤' },
  { id: 12, label: 'Share', icon: '⌯' },
  { id: 13, label: 'Layers', icon: '◇' },
  { id: 14, label: 'Next', icon: '⌄' },
  { id: 15, label: 'Pause', size: 'wide' },
  { id: 16, label: 'Play', icon: '▶' },
  { id: 17, label: 'Menu', icon: '☰' },
  { id: 18, label: 'Save', size: 'wide' },
];

export const pixelColorButtonsPage: PageDefinition = {
  id: 'pixel-color-buttons',
  title: 'Pixel Color Buttons',
  description: 'Click a button to give it a new color.',
};

export function PixelColorButtonsPage({ onBack }: PageProps) {
  const [buttons, setButtons] = useState<PixelButtonState[]>(() =>
    pixelButtonDefinitions.map((button) => ({ ...button, color: getRandomHslColor() })),
  );

  const handleButtonClick = (id: number) => {
    setButtons((current) =>
      current.map((button) => (button.id === id ? { ...button, color: getRandomHslColor() } : button)),
    );
  };

  return (
    <main className="pixel-page">
      <nav className="pixel-page__nav" aria-label="Page navigation">
        <button className="pixel-back-button" type="button" onClick={onBack}>
          &lt;- Back to menu
        </button>
      </nav>

      <section className="pixel-console" aria-labelledby="pixel-page-title">
        <header className="pixel-console__header">
          <p className="pixel-console__eyebrow">Color lab // 03</p>
          <h1 id="pixel-page-title">{pixelColorButtonsPage.title}</h1>
          <p>{pixelColorButtonsPage.description}</p>
        </header>

        <section className="pixel-grid" aria-label="Pixel color buttons">
          {buttons.map((button) => (
            <button
              key={button.id}
              className={`pixel-button ${button.size === 'wide' ? 'pixel-button--wide' : ''}`}
              type="button"
              onClick={() => handleButtonClick(button.id)}
              style={{
                '--button-color': button.color.background,
                '--button-text': button.color.text,
              } as CSSProperties}
              aria-label={`${button.label}. Change button color`}
            >
              {button.icon ? <span className="pixel-button__icon" aria-hidden="true">{button.icon}</span> : null}
              <span>{button.label}</span>
            </button>
          ))}
        </section>

        <p className="pixel-console__hint">Press any tile to recolor it</p>
      </section>
    </main>
  );
}
