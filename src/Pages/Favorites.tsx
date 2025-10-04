import { useContext } from 'react';
import { FavoritesContext } from '../Context/FavoritesContext';
import BookCard from '../Component/BookCard';

function Favorites() {
  const { favorites, removeFavorite } = useContext(FavoritesContext)!;

  if (favorites.length === 0)
    return (
      <div className="min-h-[60vh] flex items-center justify-center px-6">
        <p className="text-center text-xl font-semibold drop-shadow-lg animate-pulse" style={{ color: 'var(--muted)' }}>
          No favorites yet!
        </p>
      </div>
    );

  return (
    <div className="container-max p-6">
      <div className="glass-card p-6 rounded-xl">
        <h1 className="text-2xl md:text-3xl font-extrabold mb-6" style={{ color: 'var(--text)' }}>
          My Favorites
        </h1>
        <div className="books-grid">
          {favorites.map((book) => (
            <div key={book.id} className="rounded-xl p-3">
              <BookCard
                book={book}
                onFavorite={() => removeFavorite(book.id)}
                isFavorite={true}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Favorites;
