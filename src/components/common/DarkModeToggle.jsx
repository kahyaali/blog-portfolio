import React from 'react';
import { FiSun, FiMoon } from 'react-icons/fi';
import { useTheme } from '../../contexts/ThemeContext';

const DarkModeToggle = () => {
  const { darkMode, toggleDarkMode } = useTheme();

  return (
    <button
      onClick={toggleDarkMode}
      className="fixed bottom-6 right-6 z-50 bg-[var(--bg)] border border-[var(--border)] p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 group"
      aria-label="Dark Mode Toggle"
    >
      {darkMode ? (
        <FiSun className="text-yellow-500 text-xl group-hover:rotate-90 transition-transform" />
      ) : (
        <FiMoon className="text-[var(--text)] text-xl group-hover:rotate-12 transition-transform" />
      )}
    </button>
  );
};

export default DarkModeToggle;