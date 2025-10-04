import { useState, useContext, useEffect } from "react";
import { useSearchParams } from 'react-router-dom';
import SearchForm from "../Component/Search";
import BookCard from "../Component/BookCard";
import { searchBooks } from "../Services/booksApi";
import { FavoritesContext } from "../Context/FavoritesContext";
import heroBg from "../assets/books.jpg";
import Pagination from "../Component/Pagination";

export interface Book {
  id: string;
  volumeInfo: {
    title: string;
    authors?: string[];
    description?: string;
    imageLinks?: { thumbnail?: string };
  };
}

function Home() {
  const [books, setBooks] = useState<Book[]>([]);
  const [totalItems, setTotalItems] = useState<number>(0);
  const { favorites, addFavorite, removeFavorite } = useContext(FavoritesContext)!;
  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  // lastQuery state is persisted in the URL via search params
  const [searchParams, setSearchParams] = useSearchParams();
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));

  const handleSearch = (query: { title?: string; author?: string; genre?: string }) => {
    // update URL params; effect will perform fetch
    const params: Record<string, string> = {};
    if (query.title) params.title = query.title;
    if (query.author) params.author = query.author;
    if (query.genre) params.genre = query.genre;
    params.page = '1';
    params.pageSize = String(pageSize);
    setSearchParams(params, { replace: false });
  };

  // when page or pageSize changes, refetch if there's an active query
  // Fetch whenever the URL search params change (so browser Back/Forward restores state)
  useEffect(() => {
    const doSearch = async () => {
      const title = searchParams.get('title') || '';
      const author = searchParams.get('author') || '';
      const genre = searchParams.get('genre') || '';
      const p = parseInt(searchParams.get('page') || '1', 10) || 1;
      const ps = parseInt(searchParams.get('pageSize') || String(pageSize), 10) || pageSize;

      // reflect params into local state
  setPage(p);
  setPageSize(ps);

      if (!title && !author && !genre) {
        setBooks([]);
        setTotalItems(0);
        return;
      }

      const startIndex = (p - 1) * ps;
        setIsLoading(true);
        try {
        const res = await searchBooks({
        title,
        author,
        genre,
        maxResults: ps,
        startIndex,
      });
        setBooks(res.items);
        setTotalItems(res.totalItems);
        } catch (e) {
          console.error(e);
        } finally {
          setIsLoading(false);
        }
    };
    doSearch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  return (
    <div className="min-h-screen relative app-container">
      {/* Hero Section */}
      <section className="relative flex flex-col justify-center items-center text-center px-6 py-12">
        {/* Background image */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url('${heroBg}')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            filter: "blur(2px)",
            opacity: 0.25,
          }}
          aria-hidden
        />

        {/* Optional gradient overlay to improve readability */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, rgba(0,0,0,0.2), rgba(0,0,0,0.5))",
          }}
          aria-hidden
        />

        <div className="container-max relative z-10 py-8">
          <h1
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-3"
            style={{ color: "var(--text)" }}
          >
            Discover Your Next Book
          </h1>

          <p
            className="max-w-2xl mx-auto text-base md:text-lg font-medium mb-6 leading-relaxed"
            style={{ color: "var(--muted)" }}
          >
            Search by{" "}
            <span style={{ color: "var(--accent)", fontWeight: 600 }}>Title</span> ,{" "}
            <span style={{ color: "var(--accent)", fontWeight: 600 }}>Author </span>
 or{" "}
            <span style={{ color: "var(--accent)", fontWeight: 600 }}>Genre</span>
          </p>

          <div className="mx-auto w-full max-w-xl">
            <SearchForm onSearch={handleSearch} />
          </div>
        </div>
      </section>

      {/* Books Grid */}
      <main className="container-max px-4 py-12">
        {isLoading ? (
          <div className="text-center p-8">
            <p className="text-lg font-semibold" style={{ color: 'var(--muted)' }}>Loading results…</p>
          </div>
        ) : books.length === 0 ? (
          <div className="text-center p-8">
            <p
              className="text-xl font-semibold p-8 card glass-card"
              style={{ color: "var(--muted)" }}
            >
              No books found. Start searching!
            </p>
          </div>
        ) : (
          <div className="books-grid">
            {books.map((book) => (
              <div key={book.id}>
                <BookCard
                  book={book}
                  onFavorite={(b) => {
                    const isFav = favorites.find((f) => f.id === b.id);
                    if (isFav) removeFavorite(b.id);
                    else addFavorite(b);
                  }}
                  isFavorite={!!favorites.find((f) => f.id === book.id)}
                />
              </div>
            ))}
          </div>
        )}

        {/* Pagination controls */}
        {totalItems > 0 && (
          <div className="mt-6 flex flex-col items-center gap-4">
            <div className="flex items-center gap-4">
              <label className="text-sm text-gray-600">Page size:</label>
              <select value={pageSize} onChange={(e) => {
                const newSize = Number(e.target.value);
                // update URL params so effect will refetch
                const params: Record<string, string> = {};
                const title = searchParams.get('title');
                const author = searchParams.get('author');
                const genre = searchParams.get('genre');
                if (title) params.title = title;
                if (author) params.author = author;
                if (genre) params.genre = genre;
                params.page = '1';
                params.pageSize = String(newSize);
                setSearchParams(params);
              }} className="p-2 rounded border bg-white">
                <option value={10}>10</option>
                <option value={20}>20</option>
                <option value={40}>40</option>
              </select>
              <div className="text-sm text-gray-600">Showing page {page} of {totalPages} ({totalItems} results)</div>
            </div>

            <Pagination current={page} total={totalPages} onPage={(n) => {
              // update URL params so effect will refetch
              const params: Record<string, string> = {};
              const title = searchParams.get('title');
              const author = searchParams.get('author');
              const genre = searchParams.get('genre');
              const ps = searchParams.get('pageSize') || String(pageSize);
              if (title) params.title = title;
              if (author) params.author = author;
              if (genre) params.genre = genre;
              params.page = String(n);
              params.pageSize = ps;
              if (!isLoading) setSearchParams(params);
            }} />
          </div>
        )}
      </main>
    </div>
  );
}

export default Home;
