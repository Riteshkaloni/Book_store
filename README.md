# Book Store (React + TypeScript)

A small React + TypeScript project that demonstrates a searchable book list, a favorites list (persisted to localStorage), and routing to book details. Built with Vite, TailwindCSS, React Router, and Jest + Testing Library for tests.

## Quick overview

- Framework: React (TypeScript)
- Bundler: Vite
- Styling: Tailwind CSS
- Routing: react-router-dom (BrowserRouter, Route-based routing)
- State: React Context (Favorites) persisted to localStorage
- Tests: Jest + React Testing Library

## Prerequisites

- Node.js (recommended LTS, e.g. 18+)
- npm (bundled with Node.js) or an alternative (yarn/pnpm) — instructions below use npm

## Setup

1. Clone the repository and open the project folder:

   git clone <repo-url>
   cd Book-store

2. Install dependencies:

   npm install

## Development

- Start the dev server (Vite):

  npm run dev

- Open http://localhost:5173 (or the port shown by Vite) in your browser.

## Build & Preview

- Build for production:

  npm run build

- Preview the production build locally:

  npm run preview

## Tests & Linting

- Run tests (Jest):

  npm run test

- Run tests in watch mode:

  npm run test:watch

- Run linter (ESLint):

  npm run lint

## Project structure (important files)

- `src/main.tsx` — App root, wraps the app with `BrowserRouter`, `ThemeProvider`, and `FavoritesProvider`.
- `src/App.tsx` — Routes and shared layout (includes `Navbar`).
- `src/Component/Search.tsx` — Controlled search form component with simple validation.
- `src/Context/FavoritesContext.tsx` — React Context that stores favorites and persists them to `localStorage`.
- `src/Pages/BookDetails.tsx` — Lazy-loaded route for book details (loaded with React.lazy + Suspense).

## Routing

Routing uses `react-router-dom` with `BrowserRouter` at the root (`src/main.tsx`) and `Routes`/`Route` in `src/App.tsx`.

- Routes defined:
  - `/` -> `Home` (search and results)
  - `/book/:id` -> `BookDetails` (lazy loaded with `React.lazy` and `Suspense` to reduce initial bundle)
  - `/favorites` -> `Favorites`

Trade-offs:
- BrowserRouter is the simplest choice for single-page web apps. If you need SSR or special base paths, consider `MemoryRouter` or server-based routing.
- Lazy-loading `BookDetails` reduces initial bundle size at the cost of a small load delay when navigating to details.

## Form handling

Search uses a controlled form pattern (`useState` for each field). On submit it validates that at least one of the fields (title, author or genre) is provided and calls an `onSearch` handler passed from the parent. This keeps the component reusable and easy to test.

Trade-offs:
- Controlled inputs make validation and UI feedback straightforward, but if the form grows large you might prefer a form library (React Hook Form or Formik) for performance and ergonomics.

## State management

Favorites are handled by a small React Context (`FavoritesContext`) that exposes `favorites`, `addFavorite`, and `removeFavorite` helpers.

Persistence: favorites are persisted to `localStorage` using a `useEffect` that syncs the array whenever it changes.

Trade-offs:
- Context + localStorage is simple and fits the small app size. For larger or more complex apps consider using a dedicated state store (Redux, Zustand) or remote persistence. Also note localStorage is synchronous and may block on very large payloads.

## Testing strategy

- Unit and component tests use Jest and React Testing Library. Existing tests live in `src/__tests__` and mock assets are in `src/__mocks__`.

Tips:
- Tests run with `npm run test`. Use `npm run test:watch` for interactive development.

## Notes & next steps

- The app already uses TypeScript types for book data and components; adding more exhaustive types and prop-types where needed will help maintainability.
- For accessibility improvements, run an a11y linter (axe) and ensure keyboard navigation and proper ARIA attributes.

---

Files changed:

- `README.md` — project overview, setup and architecture notes (added)

Commit:

- chore: add README.md with setup and architecture notes

If you'd like, I can also:
- add a short CONTRIBUTING.md or developer note with recommended Node and npm versions
- add a GitHub Actions workflow to run tests and lint on push/PR

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
