import { Link, useLocation } from "react-router-dom";
import React, { useContext } from "react";
import { FaHeart, FaSun, FaMoon } from "react-icons/fa";
import { FavoritesContext } from "../Context/FavoritesContext";
import { ThemeContext } from "../Theme/ThemeContext";
import logo from "../assets/logo.png";

const Navbar: React.FC = () => {
  const location = useLocation();
  const { favorites } = useContext(FavoritesContext)!;
  const { theme, toggleTheme } = useContext(ThemeContext)!;

  const linkClass = (path: string) =>
    `px-4 py-2 rounded-md font-semibold transition-all duration-300 text-sm` +
    (location.pathname === path
      ? ` bg-[var(--accent)] text-white shadow-lg`
      : ` text-[var(--muted)] hover:text-[var(--text)] hover:bg-[rgba(255,255,255,0.04)]`);

  return (
    <nav
      className="sticky top-0 z-50"
      style={{ background: "var(--nav-bg)", boxShadow: "0 8px 30px rgba(2,6,23,0.12)" }}
    >
      <div className="container-max flex items-center justify-between gap-4 py-3">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3">
          {logo ? (
            <img
              src={logo}
              alt="BookShelf Logo"
              className="w-14 h-14 object-contain rounded-full shadow-sm"
            />
          ) : (
            <div className="w-14 h-14 rounded-full bg-[var(--accent)] flex items-center justify-center text-white font-bold">B</div>
          )}
          <span className="font-extrabold text-lg" style={{ color: "var(--text)" }}>
            BookShelf
          </span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-4">
          <Link
            to="/favorites"
            className={`${linkClass("/favorites")} relative flex items-center`}
          >
            <FaHeart className="w-5 h-5 mr-1 text-red-500" />
            Favorites
            {favorites.length > 0 && (
              <span className="absolute -top-1 -right-2 text-xs bg-red-600 text-white rounded-full w-5 h-5 flex items-center justify-center font-bold shadow">
                {favorites.length > 99 ? "99+" : favorites.length}
              </span>
            )}
          </Link>

          {/* Theme toggle */}
          <button
            onClick={toggleTheme}
            title="Toggle theme"
            className="p-2 rounded-md hover:scale-105 transition"
            style={{ color: "var(--text)" }}
          >
            {theme === "dark" ? <FaSun /> : <FaMoon />}
          </button>
        </div>

        {/* Mobile controls: theme toggle + heart icon that links to Favorites */}
        <div className="md:hidden flex items-center gap-3">
          <button
            onClick={toggleTheme}
            title="Toggle theme"
            className="p-2 rounded-md"
            style={{ color: "var(--text)" }}
            aria-label="Toggle theme"
          >
            {theme === "dark" ? <FaSun /> : <FaMoon />}
          </button>

          <Link to="/favorites" className="relative p-2 rounded-md" aria-label="Favorites">
            <FaHeart className="w-6 h-6 text-red-500" />
            {favorites.length > 0 && (
              <span className="absolute -top-1 -right-1 text-xs bg-red-600 text-white rounded-full w-5 h-5 flex items-center justify-center font-bold shadow">
                {favorites.length > 99 ? "99+" : favorites.length}
              </span>
            )}
          </Link>
        </div>
      </div>

      {/* Mobile menu removed: navigation goes directly via the heart icon on small screens */}
    </nav>
  );
};

export default Navbar;
