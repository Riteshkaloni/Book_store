import React, { createContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';

type Theme = 'light' | 'dark';
type Color = 'blue' | 'red' | 'green' | 'purple';

interface ThemeContextType {
  theme: Theme;
  color: Color;
  toggleTheme: () => void;
  setColor: (color: Color) => void;
}

export const ThemeContext = createContext<ThemeContextType>({
  theme: 'light',
  color: 'blue',
  toggleTheme: () => {},
  setColor: () => {},
});

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>('light');
  const [color, setColorState] = useState<Color>('blue');

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as Theme;
    const savedColor = localStorage.getItem('color') as Color;
    if (savedTheme) setTheme(savedTheme);
    if (savedColor) setColorState(savedColor);
  }, []);

  useEffect(() => {
    // toggle a .dark class for compatibility with any dark-mode utilities
    if (theme === 'dark') document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');

    // persist
    localStorage.setItem('theme', theme);
    localStorage.setItem('color', color);

    // Define color palettes for accent; these are kept intentionally simple
    const palettes: Record<Color, { accent: string; accentHover: string }> = {
      blue: { accent: '#2563eb', accentHover: '#1e40af' },
      red: { accent: '#ef4444', accentHover: '#b91c1c' },
      green: { accent: '#16a34a', accentHover: '#166534' },
      purple: { accent: '#7c3aed', accentHover: '#5b21b6' },
    };

    const palette = palettes[color] || palettes.blue;

    // Basic UI variables (can be extended)
    if (theme === 'dark') {
      document.documentElement.style.setProperty('--bg', '#0f172a');
      document.documentElement.style.setProperty('--page-bg', 'linear-gradient(180deg, #0b1220, #071027)');
      document.documentElement.style.setProperty('--card-bg', '#0b1220');
      document.documentElement.style.setProperty('--text', '#e6eef8');
      document.documentElement.style.setProperty('--muted', '#9aa8c7');
      document.documentElement.style.setProperty('--nav-bg', '#071033');
      document.documentElement.style.setProperty('--btn-text', '#ffffff');
    } else {
      document.documentElement.style.setProperty('--bg', '#f7fafc');
      document.documentElement.style.setProperty('--page-bg', 'linear-gradient(180deg, #f8fafc, #eef2ff)');
      document.documentElement.style.setProperty('--card-bg', '#ffffff');
      document.documentElement.style.setProperty('--text', '#0f172a');
      document.documentElement.style.setProperty('--muted', '#64748b');
      document.documentElement.style.setProperty('--nav-bg', '#ffffff');
      document.documentElement.style.setProperty('--btn-text', '#ffffff');
    }

    // Accent color
    document.documentElement.style.setProperty('--accent', palette.accent);
    document.documentElement.style.setProperty('--accent-hover', palette.accentHover);
  }, [theme, color]);

  const toggleTheme = () => setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  const setColor = (c: Color) => setColorState(c);

  return (
    <ThemeContext.Provider value={{ theme, color, toggleTheme, setColor }}>
      {children}
    </ThemeContext.Provider>
  );
};
