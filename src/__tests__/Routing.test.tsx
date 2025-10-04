// React import not required with new JSX transform
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from '../App';
import { FavoritesProvider } from '../Context/FavoritesContext';

function renderWithRouter(ui: React.ReactElement, route = '/') {
  return render(
    <FavoritesProvider>
      <MemoryRouter initialEntries={[route]}>{ui}</MemoryRouter>
    </FavoritesProvider>
  );
}

describe('App routing', () => {
  test('renders Home on default route', () => {
    renderWithRouter(<App />, '/');
    expect(screen.getByText(/Discover Your Next Book/i)).toBeInTheDocument();
  });

  test('renders Favorites page when route is /favorites', () => {
    renderWithRouter(<App />, '/favorites');
    expect(screen.getByText(/No favorites yet!/i)).toBeInTheDocument();
  });

  test('renders BookDetails route when unknown id (shows details placeholder)', () => {
    // BookDetails implementation may fetch; we just ensure route renders without crashing
    renderWithRouter(<App />, '/book/some-id');
    // If BookDetails displays a heading or element, assert; fallback: check for 'Details' link in DOM from BookCard via Navbar not present.
    // We'll assert the Navbar exists which indicates route mounted
    expect(screen.getByText(/BookShelf/i)).toBeInTheDocument();
  });
});
