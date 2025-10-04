# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    # BookShelf — Responsive Book Search

    A small React + TypeScript app for searching books (Google Books API), saving favorites and viewing details. The UI was refreshed to be modern, unique and fully responsive with a theme system (light/dark + accent colors).

    ---

    ## Overview

    This project provides a clean interface to search books by title or author, view book details, and save favorites locally. Key features added in this iteration:

    - Responsive hero and search UI.
    - Modern "glass" cards with subtle blur and lift-on-hover interactions.
    - Mobile-first responsive navigation with a collapsible menu and color-accent picker.
    - Theme system (light/dark) and user-selectable accent colors persisted to localStorage.
    - Favorites stored in localStorage via a React Context.

    ---

    ## Quick Start

    Prerequisites
    - Node.js (>= 18 recommended)
    - npm

    Install

    ```powershell
    npm install
    ```

    Run dev server

    ```powershell
    npm run dev
    ```

    Build

    ```powershell
    npm run build
    ```

    Run tests

    ```powershell
    npm test
    ```

    Notes: if `npm run build` (TypeScript) fails due to project reference settings in `tsconfig.json`, see the Troubleshooting section below.

    ---

    ## Project Structure (high level)

    - `src/` — application source
      - `Component/` — presentational components (Navbar, BookCard, SearchForm)
      - `Pages/` — routed pages (Home, BookDetails, Favorites)
      - `Context/` — React Contexts (Favorites)
      - `Theme/` — Theme provider and accent color logic
      - `Services/` — API helpers (`booksApi.tsx`)
      - `assets/` — images and logos
    - `index.css` — global CSS variables and small helpers (glass-card, hero, grid)

    ---

    ## How it works — implementation notes

    Routing
    - `react-router-dom` is used. Routes are defined in `src/App.tsx` as:
      - `/` → `Home` (search and results)
      - `/book/:id` → `BookDetails` (book detail page)
      - `/favorites` → `Favorites` (saved favorites list)

    Form handling
    - `Search` is a controlled-form component using React local state. It validates that at least Title or Author is filled before performing a search.
    - Submission calls `searchBooks` from `src/Services/booksApi.tsx`, which uses Axios to query the Google Books API.

    State management
    - Lightweight approach using React Contexts (no Redux):
      - `FavoritesContext` manages the favorites list and persists it to `localStorage`.
      - `ThemeContext` controls theme (light/dark) and accent colors and writes preferences to `localStorage`.
    - Trade-offs: Context is simple and suitable for this small app. If the app grows (many slices of state, heavy updates), a more robust state manager (Redux/ Zustand) or splitting contexts further would be appropriate.

    UI & Responsiveness
    - Global CSS variables (declared in `src/index.css`) provide theme tokens like `--accent`, `--accent-hover`, `--text`, and `--card-bg`.
    - Responsive grid uses a custom `.books-grid` helper that mirrors typical Tailwind breakpoints (1/2/3/4 columns at sm/md/lg/etc).
    - The navigation adapts to mobile with a hamburger toggle and compact controls.

    Accessibility
    - Buttons include `aria-label` and `aria-pressed` where appropriate. Images have `alt` attributes. More a11y improvements can be added (keyboard traps, skip links) in follow-ups.

    ---

    ## Trade-offs & Notes

    - Simplicity vs. scale: I intentionally kept state handling in Contexts and localStorage. This reduces boilerplate and is easier to reason about in a small project. For larger scale, moving to a normalized state store would be better.
    - TypeScript & project references: The repository uses a `tsconfig.json` with project references (see `tsconfig.app.json` and `tsconfig.node.json`). On some environments `tsc -b` may error about "composite" and emitted `.tsbuildinfo`. If you hit build errors, see Troubleshooting below.

    ---

    ## Troubleshooting

    If `npm run build` (which runs `tsc -b && vite build`) fails, try the following:

    1. Install Node types (helps with setupTests and global names):

    ```powershell
    npm install --save-dev @types/node
    ```

    2. If errors mention `tsconfig` project references (TS6306 / TS6310): either:
       - Edit `tsconfig.app.json` and `tsconfig.node.json` to include `"composite": true` in `compilerOptions`, or
       - Remove/adjust the `references` array in root `tsconfig.json` if you don't need project references.

    3. The tests environment (`setupTests.ts`) dynamically ensures `TextEncoder`/`TextDecoder` exist. If your environment lacks `util` types, installing `@types/node` helps.

    If you'd like, I can apply the recommended fix automatically (install `@types/node` and adjust tsconfig), run the build, and iterate until all errors are resolved.

    ---

    ## Recent commit notes (this iteration)

    - UI: responsive redesign (hero, nav, book cards), new CSS helpers
    - Theme: extended palette and dark/light variables in `ThemeContext`
    - Accessibility: aria labels and improved semantics on interactive controls
    - Minor TypeScript fixes: switched some imports to type-only imports to match the project's TS settings

    ---

    If you'd like, I will now:
    - start the dev server so you can preview the UI, or
    - fix the remaining TypeScript build issues (install `@types/node` and adjust tsconfig) and run a clean build and tests.

    Tell me which you'd prefer and I'll proceed.
