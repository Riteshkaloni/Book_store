import * as React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { FavoritesProvider, FavoritesContext } from '../Context/FavoritesContext';
import BookCard from '../Component/BookCard';
import type { Book } from '../Context/FavoritesContext';

const sampleBook: Book = {
  id: 'book-1',
  volumeInfo: {
    title: 'Test Driven Development',
    authors: ['Kent Beck'],
  },
};

describe('Favorites context and BookCard integration', () => {
  test('adds and removes favorite via BookCard button (integration)', () => {
    const Harness: React.FC = () => {
      const ctx = React.useContext(FavoritesContext)!;

      const handleToggle = (book: Book) => {
        const exists = ctx.favorites.find((f) => f.id === book.id);
        if (exists) ctx.removeFavorite(book.id);
        else ctx.addFavorite(book);
      };

      return (
        <div>
          <BookCard book={sampleBook} onFavorite={handleToggle} isFavorite={!!ctx.favorites.find((f) => f.id === sampleBook.id)} />
          <div data-testid="count">{ctx.favorites.length}</div>
        </div>
      );
    };

    render(
      <FavoritesProvider>
        <MemoryRouter>
          <Harness />
        </MemoryRouter>
      </FavoritesProvider>
    );

  // Initially shows Toggle Favorite button and count 0
  const toggleButton = screen.getByLabelText('Toggle Favorite');
  expect(toggleButton).toBeInTheDocument();
  expect(toggleButton.textContent).toMatch(/Add/i);
    expect(screen.getByTestId('count').textContent).toBe('0');

  // Click to add
  fireEvent.click(toggleButton);
  // After clicking the text should change to Remove Favorite and count 1
  expect(toggleButton.textContent).toMatch(/Remove/i);
  expect(screen.getByTestId('count').textContent).toBe('1');

    // localStorage should have been updated
    const stored = window.localStorage.getItem('favorites');
    expect(stored).not.toBeNull();
    const parsed = stored ? JSON.parse(stored) : [];
    expect(parsed.length).toBe(1);

    // Click to remove
  fireEvent.click(toggleButton);
  expect(toggleButton.textContent).toMatch(/Add/i);
    expect(screen.getByTestId('count').textContent).toBe('0');
  });

  test('favorites provider stores favorites and removes them directly', () => {
    let contextValue: any = null;

    const Consumer = () => {
      const ctx = React.useContext(FavoritesContext)!;
      contextValue = ctx;
      return null;
    };

    render(
      <FavoritesProvider>
        <Consumer />
      </FavoritesProvider>
    );

    // Initially empty
    expect(contextValue.favorites).toEqual([]);

    // Add favorite (wrap in act because it updates state)
    act(() => {
      contextValue.addFavorite(sampleBook);
    });
    expect(contextValue.favorites).toHaveLength(1);
    expect(contextValue.favorites[0].id).toBe('book-1');

    // Remove favorite
    act(() => {
      contextValue.removeFavorite('book-1');
    });
    expect(contextValue.favorites).toHaveLength(0);
  });
});
