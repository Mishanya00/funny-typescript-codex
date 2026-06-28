# funny-typescript-codex

Repository for experimenting with small TypeScript UI ideas in two variants: a pure TypeScript version and a React + TypeScript version.

## What is included

Both variants share the same experience:
- a main menu with page cards,
- a page transition when a card is selected,
- and a back button that returns to the menu.

The first page in each version is **Random Color Buttons**: it shows 10 buttons with random pastel colors, and clicking a button updates just that button.

## Project structure

- [src/pure-ts](src/pure-ts) contains the original pure TypeScript implementation.
- [src/react](src/react) contains the React + TypeScript implementation.

## Scripts

- `npm install` installs the dependencies for both variants.
- `npm run dev` starts the pure TypeScript app at the root entry.
- `npm run dev:react` starts the React variant at `/react.html`.
- `npm run check` type-checks the source without emitting JavaScript.
- `npm run build` type-checks the source and creates a production build in `dist/`.
- `npm run preview` serves the production build locally.

Generated JavaScript in `dist/` is build output and should not be committed.
