# Repository Guidelines

## Project Structure & Module Organization

This is a Vite project containing two implementations of the same small UI playground:

- `src/pure-ts/` contains the DOM-based TypeScript implementation.
- `src/react/` contains the React + TypeScript implementation.
- `src/shared/` contains framework-agnostic utilities shared by both versions.
- `src/*/components/` contains reusable UI modules such as `MainMenu`.
- `src/*/pages/<page-name>/` contains one page component/module and its page-specific CSS.
- `src/*/styles/global.css` contains implementation-wide styles.
- `index.html` and `react.html` are the two Vite entry pages.

Keep new pages isolated under `pages/<kebab-case-name>/` and colocate their styles with the page. Keep entry files focused on bootstrapping and top-level navigation.

## Build, Test, and Development Commands

- `npm install` installs dependencies.
- `npm run dev` starts the pure TypeScript app.
- `npm run dev:react` starts the React app at `/react.html`.
- `npm run check` runs TypeScript type checking without emitting files.
- `npm run build` type-checks and builds both HTML entry points into `dist/`.
- `npm run preview` serves the production build locally.

## Coding Style & Naming Conventions

Use TypeScript with strict checking, two-space indentation, semicolons, and single quotes in source files. Use `PascalCase` for React components and page modules, `camelCase` for functions and variables, and `kebab-case` for page directories. Prefer existing patterns and small focused modules. No formatter or linter is currently configured; run `npm run check` after source changes.

## Testing Guidelines

There is currently no automated test framework or coverage requirement. At minimum, run `npm run check` and `npm run build`. For UI changes, manually verify both entry points, page navigation, and interactive behavior in a browser.

## Commit & Pull Request Guidelines

Recent commits use short imperative subjects, with occasional Conventional Commit prefixes such as `feat:`. Keep commits focused and describe the user-visible or structural change. Pull requests should include a concise summary, validation commands run, and screenshots or a short recording for visual/UI changes. Mention any follow-up work or known limitations.
