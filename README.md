# funny-typescript-codex

Repository for making fun TypeScript components for testing Codex possibilities.

## Current app

The project is a small pure TypeScript single-page app. It starts with a main menu of page cards. Selecting a card replaces the current view with that page, and every page includes a back button for returning to the menu.

The first page is **Random Color Buttons**: it displays 10 buttons with different random colors. Pressing any button changes only that button to another random color.

## Scripts

- `npm run dev` starts the Vite development server and serves the TypeScript source entry.
- `npm run check` type-checks the TypeScript source without emitting JavaScript.
- `npm run build` type-checks the source and creates a production build in `dist/`.
- `npm run preview` serves the production build locally.

Generated JavaScript in `dist/` is build output and should not be committed.
