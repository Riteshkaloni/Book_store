import { Link } from 'react-router-dom';
import { HeartIcon as SolidHeart, HeartIcon as OutlineHeart } from '@heroicons/react/24/solid';

interface BookVolumeInfo {
  title: string;
  authors?: string[];
  imageLinks?: {
    thumbnail?: string;
  };
}

interface Book {
  id: string;
  volumeInfo: BookVolumeInfo;
}

interface BookCardProps {
  book: Book;
  onFavorite: (book: Book) => void;
  isFavorite: boolean;
}

const BookCard: React.FC<BookCardProps> = ({ book, onFavorite, isFavorite }) => {
  const { title, authors, imageLinks } = book.volumeInfo;

  return (
    <article className="book-card h-full flex flex-col justify-between book-card-hover rounded-xl p-4 transition-all duration-300 animate-fade-in glass-card" aria-labelledby={`book-${book.id}`} role="article">
      <div className="flex flex-col items-center">
        <div className="w-40 h-56 md:w-44 md:h-64 rounded-lg overflow-hidden flex items-center justify-center shadow-sm" style={{ background: 'linear-gradient(180deg, rgba(0,0,0,0.02), rgba(0,0,0,0.01))' }}>
          {imageLinks?.thumbnail ? (
            <img src={imageLinks.thumbnail} alt={title} className="cover-img transition-transform duration-300 hover:scale-105" />
          ) : (
            <div className="text-gray-400 italic">No Image</div>
          )}
        </div>

  <h2 id={`book-${book.id}`} className="book-title mt-3 font-semibold text-lg text-center" style={{ color: 'var(--text)' }}>{title}</h2>

        <p className="text-sm text-center mt-1" style={{ color: 'var(--muted)' }}>{authors && authors.length ? authors.join(', ') : <span className="italic text-gray-400">Unknown Author</span>}</p>
      </div>

      <div className="mt-4 flex items-center justify-between gap-3">
        <button
          onClick={() => onFavorite(book)}
          className={`flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-full shadow-sm transition-colors duration-200`} 
          style={{ background: isFavorite ? 'rgba(255, 192, 203, 0.12)' : 'linear-gradient(90deg, rgba(37,99,235,0.08), rgba(37,99,235,0.02))', border: '1px solid rgba(0,0,0,0.06)', color: 'var(--text)' }}
          aria-pressed={isFavorite}
          aria-label="Toggle Favorite"
        >
          {isFavorite ? (
            <SolidHeart className="w-5 h-5 text-pink-500" />
          ) : (
            <OutlineHeart className="w-5 h-5 text-[var(--accent)]" />
          )}
          <span className="text-sm font-medium">{isFavorite ? 'Remove' : 'Add'}</span>
        </button>

        <Link to={`/book/${book.id}`} className="px-3 py-2 rounded-md font-medium" style={{ color: 'var(--accent)', border: '1px solid rgba(0,0,0,0.04)' }}>
          Details
        </Link>
      </div>
    </article>
  );
};

export default BookCard;

/* Add this animation to your CSS or Tailwind config:
@keyframes fade-in { from { opacity: 0; } to { opacity: 1; } }
.animate-fade-in { animation: fade-in 0.7s ease-out; }
*/
