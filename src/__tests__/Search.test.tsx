// React import not required with new JSX transform
import { render, screen, fireEvent } from '@testing-library/react';
import SearchForm from '../Component/Search';

describe('SearchForm', () => {
  test('shows validation error when both fields empty', () => {
    const onSearch = jest.fn();
    render(<SearchForm onSearch={onSearch} />);

    const button = screen.getByRole('button', { name: /search/i });
    fireEvent.click(button);

    expect(screen.getByText(/Please fill at least Title, Author or Genre/i)).toBeInTheDocument();
    expect(onSearch).not.toHaveBeenCalled();
  });

  test('submits when title provided', () => {
    const onSearch = jest.fn();
    render(<SearchForm onSearch={onSearch} />);

    const titleInput = screen.getByPlaceholderText(/title/i);
    fireEvent.change(titleInput, { target: { value: 'React' } });

    const button = screen.getByRole('button', { name: /search/i });
    fireEvent.click(button);

    expect(onSearch).toHaveBeenCalledWith({ title: 'React', author: '', genre: '' });
    expect(screen.queryByText(/Please fill at least Title, Author or Genre/i)).not.toBeInTheDocument();
  });

  test('submits when author provided', () => {
    const onSearch = jest.fn();
    render(<SearchForm onSearch={onSearch} />);

    const authorInput = screen.getByPlaceholderText(/author/i);
    fireEvent.change(authorInput, { target: { value: 'Kent' } });

    const button = screen.getByRole('button', { name: /search/i });
    fireEvent.click(button);

    expect(onSearch).toHaveBeenCalledWith({ title: '', author: 'Kent', genre: '' });
  });

  test('submits when genre provided', () => {
    const onSearch = jest.fn();
    render(<SearchForm onSearch={onSearch} />);

    const genreInput = screen.getByPlaceholderText(/genre/i);
    fireEvent.change(genreInput, { target: { value: 'Programming' } });

    const button = screen.getByRole('button', { name: /search/i });
    fireEvent.click(button);

    expect(onSearch).toHaveBeenCalledWith({ title: '', author: '', genre: 'Programming' });
  });
});
