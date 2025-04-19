import React, { useState, useEffect } from "react";

const SearchBar = ({
  placeholder = "Search",
  onSearch = value,
  onChange,
  clearable = true,
}) => {
  const [searchValue, setSearchValue] = useState(value || "");
  const [debouncedValue, setDebouncedValue] = useState(searchValue);

  // Debouncing search input to avoid frequent re-renders
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(searchValue);
    }, debounceTime);

    return () => {
      clearTimeout(handler); // Cleanup timeout if searchValue changes quickly
    };
  }, [searchValue, debounceTime]);

  // When debounced value changes, trigger the onSearch prop
  useEffect(() => {
    if (debouncedValue !== value) {
      onSearch(debouncedValue);
    }
  }, [debouncedValue, value, onSearch]);

  // Handle input changes
  const handleChange = (e) => {
    const value = e.target.value;
    setSearchValue(value);
    if (onChange) onChange(value);
  };

  // Handle clearing the input field
  const handleClear = () => {
    setSearchValue("");
    onSearch(""); // Optionally trigger search with empty string
  };

  return (
    <div className={`search-bar ${className}`}>
      <input
        type="text"
        className="search-input"
        value={searchValue}
        onChange={handleChange}
        placeholder={placeholder}
      />
      {clearable && searchValue && (
        <button className="clear-button" onClick={handleClear}>
          X
        </button>
      )}
    </div>
  );
};

export default SearchBar;
