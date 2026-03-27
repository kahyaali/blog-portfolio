import React from 'react';
import { FiSearch, FiX } from 'react-icons/fi';

const SearchBar = ({ searchTerm, setSearchTerm, placeholder = "Ara...", className = "" }) => {
  return (
    <div className={`w-full ${className}`}>
      <div className="flex items-center border border-[var(--border)] rounded-lg bg-[var(--bg)] focus-within:border-[var(--accent)] focus-within:ring-1 focus-within:ring-[var(--accent)] transition">
        <div className="pl-3 pr-2">
          <FiSearch className="text-[var(--text)]" size={18} />
        </div>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder={placeholder}
          className="w-full py-2.5 pr-3 bg-transparent text-[var(--text-h)] placeholder:text-[var(--text)] placeholder:text-sm focus:outline-none"
        />
        {searchTerm && (
          <button
            onClick={() => setSearchTerm('')}
            className="pr-3 pl-1 text-[var(--text)] hover:text-[var(--accent)] transition"
          >
            <FiX size={18} />
          </button>
        )}
      </div>
    </div>
  );
};

export default SearchBar;