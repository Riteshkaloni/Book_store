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
  title?: string;
  author?: string;
  genre?: string;
}

// Search books function
export const searchBooks = async ({
  title = "",
  author = "",
  genre = "",
}: SearchParams = {}): Promise<Book[]> => {
  try {
    const queryParts: string[] = [];
    if (title) queryParts.push(`intitle:${title}`);
    if (author) queryParts.push(`inauthor:${author}`);
    if (genre) queryParts.push(genre);

    const query = queryParts.join("+");
    if (!query) return [];

    const res = await axios.get(
      `https://www.googleapis.com/books/v1/volumes?q=${query}&ts=${Date.now()}`, // timestamp to avoid 304
      {
        headers: {
          "Cache-Control": "no-cache",
          Pragma: "no-cache",
        },
      }
    );

    return res.data.items || [];
  } catch (error) {
    console.error("Error searching books:", error);
    return [];
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
