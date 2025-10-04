import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getBookById } from '../Services/booksApi';

interface VolumeInfo {
  title: string;
  authors?: string[];
  description?: string;
  imageLinks?: { thumbnail?: string };
}

interface Book {
  volumeInfo: VolumeInfo;
}

function BookDetails() {
  const { id } = useParams<{ id: string }>();
  const [book, setBook] = useState<Book | null>(null);

  useEffect(() => {
    if (id) {
      getBookById(id).then((data: Book | null) => setBook(data));
    }
  }, [id]);

  if (!book)
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <p className="text-center mt-6 text-gray-600 text-lg">Loading...</p>
      </div>
    );

  const { title, authors, description, imageLinks } = book.volumeInfo;

  return (
    <div className="min-h-screen flex justify-center items-start p-6">
      <div className="glass-card rounded-xl flex flex-col md:flex-row overflow-hidden max-w-4xl w-full p-4">

        {/* Book Image */}
        {imageLinks?.thumbnail && (
          <div className="flex-shrink-0 flex justify-center items-start p-4">
            <img
              src={imageLinks.thumbnail}
              alt={title}
              className="w-40 h-56 md:w-48 md:h-64 object-contain rounded-lg shadow"
            />
          </div>
        )}

        {/* Book Details */}
        <div className="flex-1 p-4 md:p-6 flex flex-col justify-center">
          <h1 className="text-2xl md:text-3xl font-bold mb-2" style={{ color: 'var(--text)' }}>{title}</h1>
          <p className="text-gray-500 italic mb-4" style={{ color: 'var(--muted)' }}>
            {authors ? authors.join(', ') : 'Unknown Author'}
          </p>

          {/* Description with HTML rendering */}
          <div
            className="text-gray-700 text-sm md:text-base leading-relaxed"
            style={{ color: 'var(--text)' }}
            dangerouslySetInnerHTML={{
              __html: description || 'No description available for this book.',
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default BookDetails;
