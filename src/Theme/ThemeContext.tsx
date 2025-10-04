import React, { createContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';

type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

export const ThemeContext = createContext<ThemeContextType>({
  theme: 'light',
  toggleTheme: () => {},
});

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>('light');

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as Theme;
    if (savedTheme) setTheme(savedTheme);
  }, []);

  useEffect(() => {
    if (theme === 'dark') document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');

    localStorage.setItem('theme', theme);

    // Set basic UI variables
    if (theme === 'dark') {
      document.documentElement.style.setProperty('--bg', '#0f172a');
      document.documentElement.style.setProperty('--page-bg', 'linear-gradient(180deg, #0b1220, #071027)');
      document.documentElement.style.setProperty('--card-bg', '#0b1220');
      document.documentElement.style.setProperty('--text', '#e6eef8');
      document.documentElement.style.setProperty('--muted', '#9aa8c7');
      document.documentElement.style.setProperty('--nav-bg', '#071033');
      document.documentElement.style.setProperty('--btn-text', '#ffffff');
      document.documentElement.style.setProperty('--accent', '#2563eb');
      document.documentElement.style.setProperty('--accent-hover', '#1e40af');
    } else {
      document.documentElement.style.setProperty('--bg', '#f7fafc');
      document.documentElement.style.setProperty('--page-bg', 'linear-gradient(180deg, #f8fafc, #eef2ff)');
      document.documentElement.style.setProperty('--card-bg', '#ffffff');
      document.documentElement.style.setProperty('--text', '#0f172a');
      document.documentElement.style.setProperty('--muted', '#64748b');
      document.documentElement.style.setProperty('--nav-bg', '#ffffff');
      document.documentElement.style.setProperty('--btn-text', '#ffffff');
      document.documentElement.style.setProperty('--accent', '#2563eb');
      document.documentElement.style.setProperty('--accent-hover', '#1e40af');
    }
  }, [theme]);

  const toggleTheme = () => setTheme(prev => (prev === 'light' ? 'dark' : 'light'));

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
