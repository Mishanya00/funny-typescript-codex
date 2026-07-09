import React from 'react';
import ReactDOM from 'react-dom/client';

type FloatingButtonState = {
  color: ReturnType<typeof getRandomHslColor>;
  position: { x: number; y: number };
};

const colorPage = {
  id: 'color-buttons',
  title: 'Random Color Buttons',
  description: 'Press any button to replace its color with a new random one.',
};

const movingButtonPage = {
  id: 'moving-color-button',
  title: 'Moving Color Button',
  description: 'Click the button to send it to a random screen position and give it a new color.',
};

function App() {
  const [activePage, setActivePage] = React.useState<string | null>(null);

  if (activePage === colorPage.id) {
    return <ColorButtonsPage onBack={() => setActivePage(null)} />;
  }

  if (activePage === movingButtonPage.id) {
    return <MovingColorButtonPage onBack={() => setActivePage(null)} />;
  }

  return <MainMenu onSelect={setActivePage} />;
}

function MainMenu({ onSelect }: { onSelect: (pageId: string) => void }) {
  const pages = [colorPage, movingButtonPage];
  return (
    <main className="app-shell">
      <section className="hero">
        <p className="eyebrow">Main menu</p>
        <h1>Choose a page</h1>
        <p className="hero-text">
          Pick a card to open a small TypeScript page or minigame. More cards can be added here as the project grows.
        </p>
      </section>

      <section className="card-grid" aria-label="Available pages">
        {pages.map((page) => (
          <button key={page.id} className="page-card" type="button" onClick={() => onSelect(page.id)}>
            <span className="page-card__title">{page.title}</span>
            <span className="page-card__description">{page.description}</span>
            <span className="page-card__hint">Open page →</span>
          </button>
        ))}
      </section>
    </main>
  );
}

function ColorButtonsPage({ onBack }: { onBack: () => void }) {
  const [buttons, setButtons] = React.useState(() => Array.from({ length: 10 }, (_, index) => ({ id: index + 1, color: getRandomHslColor() })));

  const handleButtonClick = (id: number) => {
    setButtons((current) =>
      current.map((button) => (button.id === id ? { ...button, color: getRandomHslColor() } : button)),
    );
  };

  return (
    <main className="app-shell color-page">
      <nav className="page-nav" aria-label="Page navigation">
        <button className="back-button" type="button" onClick={onBack}>
          ← Back to menu
        </button>
      </nav>

      <section className="page-header">
        <h1>{colorPage.title}</h1>
        <p>{colorPage.description}</p>
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


function MovingColorButtonPage({ onBack }: { onBack: () => void }) {
  const buttonRef = React.useRef<HTMLButtonElement>(null);
  const [buttonState, setButtonState] = React.useState<FloatingButtonState>(() => ({
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
          ← Back to menu
        </button>
      </nav>

      <section className="floating-page-header">
        <h1>{movingButtonPage.title}</h1>
        <p>{movingButtonPage.description}</p>
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

function getRandomHslColor() {
  const hue = getRandomInteger(0, 359);
  const saturation = getRandomInteger(58, 92);
  const lightness = getRandomInteger(35, 72);
  const text = lightness > 55 ? '#111827' : '#ffffff';

  return {
    background: `hsl(${hue} ${saturation}% ${lightness}%)`,
    text,
  };
}

function getRandomViewportPosition(buttonWidth = 140, buttonHeight = 64) {
  const safePadding = 16;
  const maxX = Math.max(safePadding, window.innerWidth - buttonWidth - safePadding);
  const maxY = Math.max(safePadding, window.innerHeight - buttonHeight - safePadding);

  return {
    x: getRandomInteger(safePadding, maxX),
    y: getRandomInteger(safePadding, maxY),
  };
}

function getRandomInteger(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

ReactDOM.createRoot(document.getElementById('react-root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
