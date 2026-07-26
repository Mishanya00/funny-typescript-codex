import type { PageDefinition } from '../types';
import './MainMenu.css';

type MainMenuProps = {
  pages: PageDefinition[];
  onSelect: (pageId: string) => void;
};

export function MainMenu({ pages, onSelect }: MainMenuProps) {
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
            <span className="page-card__hint">Open page -&gt;</span>
          </button>
        ))}
      </section>
    </main>
  );
}
