import { Link, useLocation } from "react-router-dom";
import React, { useContext, useState } from "react";
import { FaHeart, FaSun, FaMoon } from "react-icons/fa";
import { FavoritesContext } from "../Context/FavoritesContext";
import { ThemeContext } from "../Theme/ThemeContext";
import logo from "../assets/logo.png";

const Navbar: React.FC = () => {
  const location = useLocation();
  const { favorites } = useContext(FavoritesContext)!;
  const { theme, toggleTheme, color, setColor } = useContext(ThemeContext)!;
  const [open, setOpen] = useState(false);

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
          <img
            src={logo}
            alt="BookShelf Logo"
            className="w-14 h-14 object-contain rounded-full shadow-sm"
          />
          <span className="font-extrabold text-lg" style={{ color: "var(--text)" }}>
            BookShelf
          </span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-4">
          <Link to="/" className={linkClass("/")}>
            Search
          </Link>

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

          <button
            onClick={toggleTheme}
            title="Toggle theme"
            className="p-2 rounded-md hover:scale-105 transition"
            style={{ color: "var(--text)" }}
          >
            {theme === "dark" ? <FaSun /> : <FaMoon />}
          </button>

          <div className="flex items-center gap-2">
            {(["blue", "red", "green", "purple"] as const).map((c) => (
              <button
                key={c}
                onClick={() => setColor(c)}
                aria-label={`Set ${c} accent`}
                className={`w-7 h-7 rounded-full border-2 border-transparent transition-transform hover:scale-110`}
                style={{
                  background:
                    c === "blue"
                      ? "#2563eb"
                      : c === "red"
                      ? "#ef4444"
                      : c === "green"
                      ? "#16a34a"
                      : "#7c3aed",
                  boxShadow: color === c ? "0 6px 18px rgba(0,0,0,0.15)" : undefined,
                  transform: color === c ? "scale(1.08)" : undefined,
                }}
              />
            ))}
          </div>
        </div>

        {/* Mobile controls */}
        <div className="md:hidden flex items-center gap-3">
          <button
            onClick={toggleTheme}
            title="Toggle theme"
            className="p-2 rounded-md"
            style={{ color: "var(--text)" }}
          >
            {theme === "dark" ? <FaSun /> : <FaMoon />}
          </button>

          {/* Hamburger / Cross button */}
          <button
            onClick={() => setOpen((s) => !s)}
            aria-label="Toggle menu"
            className="p-2 rounded-md border transition-all duration-300"
            style={{ borderColor: "rgba(0,0,0,0.06)" }}
          >
            {open ? (
              // Cross Icon
              <div style={{ width: 22, height: 22, position: "relative" }}>
                <div
                  style={{
                    position: "absolute",
                    width: "100%",
                    height: 2,
                    background: "var(--text)",
                    transform: "rotate(45deg)",
                    top: "50%",
                    left: 0,
                    transition: "0.3s",
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    width: "100%",
                    height: 2,
                    background: "var(--text)",
                    transform: "rotate(-45deg)",
                    top: "50%",
                    left: 0,
                    transition: "0.3s",
                  }}
                />
              </div>
            ) : (
              // Hamburger Icon
              <div style={{ width: 22 }}>
                <div style={{ height: 2, background: "var(--text)", marginBottom: 4 }} />
                <div style={{ height: 2, background: "var(--text)", marginBottom: 4 }} />
                <div style={{ height: 2, background: "var(--text)" }} />
              </div>
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`transition-all duration-300 md:hidden overflow-hidden ${
          open ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="container-max flex flex-col gap-3 py-4">
          <Link to="/" onClick={() => setOpen(false)} className={linkClass("/")}>
            Search
          </Link>
          <Link
            to="/favorites"
            onClick={() => setOpen(false)}
            className={`${linkClass("/favorites")} relative flex items-center`}
          >
            <FaHeart className="w-5 h-5 mr-2 text-red-500" /> Favorites
            {favorites.length > 0 && (
              <span className="ml-2 text-xs bg-red-600 text-white rounded-full w-5 h-5 flex items-center justify-center font-bold shadow">
                {favorites.length > 99 ? "99+" : favorites.length}
              </span>
            )}
          </Link>

          <div className="flex items-center gap-2 pt-2">
            {(["blue", "red", "green", "purple"] as const).map((c) => (
              <button
                key={c}
                onClick={() => setColor(c)}
                aria-label={`Set ${c} accent`}
                className={`w-8 h-8 rounded-full border-2 border-transparent transition-transform hover:scale-110`}
                style={{
                  background:
                    c === "blue"
                      ? "#2563eb"
                      : c === "red"
                      ? "#ef4444"
                      : c === "green"
                      ? "#16a34a"
                      : "#7c3aed",
                  boxShadow: color === c ? "0 6px 18px rgba(0,0,0,0.12)" : undefined,
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
