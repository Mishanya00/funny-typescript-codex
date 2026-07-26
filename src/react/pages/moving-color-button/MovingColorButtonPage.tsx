import { useRef, useState } from 'react';
import {
  getRandomHslColor,
  getRandomViewportPosition,
  type HslColor,
  type ViewportPosition,
} from '../../../shared/random';
import type { PageDefinition, PageProps } from '../../types';
import './MovingColorButtonPage.css';

type FloatingButtonState = {
  color: HslColor;
  position: ViewportPosition;
};

export const movingColorButtonPage: PageDefinition = {
  id: 'moving-color-button',
  title: 'Moving Color Button',
  description: 'Click the button to send it to a random screen position and give it a new color.',
};

export function MovingColorButtonPage({ onBack }: PageProps) {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [buttonState, setButtonState] = useState<FloatingButtonState>(() => ({
    color: getRandomHslColor(),
    position: getRandomViewportPosition(),
  }));

  const moveButton = () => {
    const buttonRect = buttonRef.current?.getBoundingClientRect();

    setButtonState({
      color: getRandomHslColor(),
      position: getRandomViewportPosition(buttonRect?.width, buttonRect?.height),
    });
  };

  return (
    <main className="moving-page">
      <nav className="floating-page-nav" aria-label="Page navigation">
        <button className="back-button" type="button" onClick={onBack}>
          &lt;- Back to menu
        </button>
      </nav>

      <section className="floating-page-header">
        <h1>{movingColorButtonPage.title}</h1>
        <p>{movingColorButtonPage.description}</p>
      </section>

      <button
        ref={buttonRef}
        className="moving-color-button"
        type="button"
        onClick={moveButton}
        style={{
          backgroundColor: buttonState.color.background,
          color: buttonState.color.text,
          left: buttonState.position.x,
          top: buttonState.position.y,
        }}
      >
        Catch me
      </button>
    </main>
  );
}
