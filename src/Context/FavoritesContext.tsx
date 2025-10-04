import React, { createContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';

interface BookVolumeInfo {
  title: string;
  authors?: string[];
  imageLinks?: { thumbnail?: string };
}

export interface Book {
  id: string;
  volumeInfo: BookVolumeInfo;
}

interface FavoritesContextType {
  favorites: Book[];
  addFavorite: (book: Book) => void;
  removeFavorite: (id: string) => void;
}

export const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

interface FavoritesProviderProps {
  children: ReactNode;
}

export const FavoritesProvider: React.FC<FavoritesProviderProps> = ({ children }) => {
  const [favorites, setFavorites] = useState<Book[]>(() => {
    const saved = localStorage.getItem("favorites");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  const addFavorite = (book: Book) => {
    if (!favorites.find(f => f.id === book.id)) {
      setFavorites([...favorites, book]);
    }
  };

  const removeFavorite = (id: string) => {
    setFavorites(favorites.filter(f => f.id !== id));
  };

  return (
    <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};
