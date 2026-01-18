import React from 'react';
import './SearchBar.css';

function SearchBar({ searchQuery, onSearchChange }) {
  return (
    <div className="search-bar-container">
      <input
        type="text"
        className="search-input"
        placeholder="메모 검색..."
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
      />
      {searchQuery && (
        <button
          className="clear-search-btn"
          onClick={() => onSearchChange('')}
          aria-label="검색 초기화"
        >
          ✕
        </button>
      )}
    </div>
  );
}

export default SearchBar;
