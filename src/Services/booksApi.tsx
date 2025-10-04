import axios from "axios";

// TypeScript type for a book
export interface Book {
  id: string;
  volumeInfo: {
    title: string;
    authors?: string[];
    categories?: string[];
    description?: string;
    imageLinks?: {
      thumbnail?: string;
      smallThumbnail?: string;
    };
    publishedDate?: string;
  };
}

interface SearchParams {
  // Either provide a raw query q or build from title/author/genre
  q?: string;
  title?: string;
  author?: string;
  genre?: string;
  maxResults?: number; // default 10, max 40
  startIndex?: number; // pagination start index
}

// Search books function
export interface SearchResult {
  items: Book[];
  totalItems: number;
}

export const searchBooks = async ({
  q,
  title = "",
  author = "",
  genre = "",
  maxResults = 10,
  startIndex,
}: SearchParams = {}): Promise<SearchResult> => {
  try {
    let query = "";
    if (q) query = q;
    else {
      const queryParts: string[] = [];
      if (title) queryParts.push(`intitle:${title}`);
      if (author) queryParts.push(`inauthor:${author}`);
      if (genre) queryParts.push(genre);
      query = queryParts.join("+");
    }

    if (!query) return { items: [], totalItems: 0 };

    // Respect API limits
    const safeMax = Math.min(Math.max(typeof maxResults === 'number' ? maxResults : 10, 1), 40);
    const startPart = typeof startIndex === 'number' && startIndex > 0 ? `&startIndex=${startIndex}` : "";

    const url = `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(query)}&maxResults=${safeMax}${startPart}&ts=${Date.now()}`;

    const res = await axios.get(url, {
      headers: {
        "Cache-Control": "no-cache",
        Pragma: "no-cache",
      },
    });

    const items: Book[] = res.data.items || [];
    const totalItems: number = typeof res.data.totalItems === 'number' ? res.data.totalItems : items.length;
    return { items, totalItems };
  } catch (error) {
    console.error("Error searching books:", error);
    return { items: [], totalItems: 0 };
  }
};

// Get book by ID
export const getBookById = async (id: string): Promise<Book | null> => {
  try {
    const res = await axios.get(
      `https://www.googleapis.com/books/v1/volumes/${id}?ts=${Date.now()}`,
      {
        headers: {
          "Cache-Control": "no-cache",
          Pragma: "no-cache",
        },
      }
    );
    return res.data;
  } catch (error) {
    console.error(`Error fetching book with id ${id}:`, error);
    return null;
  }
};
