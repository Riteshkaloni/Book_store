import { useState, useContext } from "react";
import SearchForm from "../Component/Search";
import BookCard from "../Component/BookCard";
import { searchBooks } from "../Services/booksApi";
import { FavoritesContext } from "../Context/FavoritesContext";
import heroBg from "../assets/books.jpg";

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
  const { favorites, addFavorite, removeFavorite } = useContext(FavoritesContext)!;

  const handleSearch = async (query: { title?: string; author?: string }) => {
    const results: Book[] = await searchBooks({
      title: query.title || "",
      author: query.author || "",
    });
    setBooks(results);
  };

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
            opacity: 0.25, // adjust for visibility
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
            <span style={{ color: "var(--accent)", fontWeight: 600 }}>Title</span> or{" "}
            <span style={{ color: "var(--accent)", fontWeight: 600 }}>Author</span>
          </p>

          <div className="mx-auto w-full max-w-xl">
            <SearchForm onSearch={handleSearch} />
          </div>
        </div>
      </section>

      {/* Books Grid */}
      <main className="container-max px-4 py-12">
        {books.length === 0 ? (
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
      </main>
    </div>
  );
}

export default Home;
