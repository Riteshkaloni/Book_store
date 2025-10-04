import React, { useState } from 'react';
import type { ChangeEvent, FormEvent } from 'react';

interface SearchQuery {
  title: string;
  author: string;
  genre?: string;
}

interface SearchFormProps {
  onSearch: (query: SearchQuery) => void;
}

const SearchForm: React.FC<SearchFormProps> = ({ onSearch }) => {
  const [title, setTitle] = useState<string>('');
  const [author, setAuthor] = useState<string>('');
  const [genre, setGenre] = useState<string>('');
  const [error, setError] = useState<string>('');

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!title && !author && !genre) {
      setError('Please fill at least Title, Author or Genre');
      return;
    }
    setError('');
    onSearch({ title, author, genre });
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-4 bg-indigo-900/70 rounded-lg shadow-lg">
      <input
        placeholder="Title"
        value={title}
        onChange={(e: ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)}
        className="rounded-lg border border-indigo-600 bg-indigo-800 text-gray-200 p-3 placeholder-indigo-400 focus:border-pink-400 focus:ring-2 focus:ring-pink-500 focus:outline-none transition"
      />
      <input
        placeholder="Author"
        value={author}
        onChange={(e: ChangeEvent<HTMLInputElement>) => setAuthor(e.target.value)}
        className="rounded-lg border border-indigo-600 bg-indigo-800 text-gray-200 p-3 placeholder-indigo-400 focus:border-pink-400 focus:ring-2 focus:ring-pink-500 focus:outline-none transition"
      />
      <input
        placeholder="Genre "
        value={genre}
        onChange={(e: ChangeEvent<HTMLInputElement>) => setGenre(e.target.value)}
        className="rounded-lg border border-indigo-600 bg-indigo-800 text-gray-200 p-3 placeholder-indigo-400 focus:border-pink-400 focus:ring-2 focus:ring-pink-500 focus:outline-none transition"
      />
      {error && (
        <p className="text-pink-400 font-semibold text-center drop-shadow-md animate-pulse">{error}</p>
      )}
      <button
        type="submit"
        className="bg-gradient-to-r from-pink-500 via-red-500 to-yellow-400 text-white font-bold py-3 rounded-lg shadow-lg hover:brightness-110 transition"
      >
        Search
      </button>
    </form>
  );
};

export default SearchForm;
