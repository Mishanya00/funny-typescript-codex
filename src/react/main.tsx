import React from 'react';
import ReactDOM from 'react-dom/client';

const colorPage = {
  id: 'color-buttons',
  title: 'Random Color Buttons',
  description: 'Press any button to replace its color with a new random one.',
};

function App() {
  const [activePage, setActivePage] = React.useState<string | null>(null);

  if (activePage === colorPage.id) {
    return <ColorButtonsPage onBack={() => setActivePage(null)} />;
  }

  return <MainMenu onSelect={() => setActivePage(colorPage.id)} />;
}

function MainMenu({ onSelect }: { onSelect: () => void }) {
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
        <button className="page-card" type="button" onClick={onSelect}>
          <span className="page-card__title">{colorPage.title}</span>
          <span className="page-card__description">{colorPage.description}</span>
          <span className="page-card__hint">Open page →</span>
        </button>
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

function getRandomInteger(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

ReactDOM.createRoot(document.getElementById('react-root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
