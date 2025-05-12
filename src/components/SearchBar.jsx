function SearchBar({ onSearch }) {
  return (
    <input
      type="text"
      onChange={(e) => onSearch(e.target.value)}
      placeholder="Buscar canción"
      className="w-full border p-2 mb-4"
    />
  );
}

export default SearchBar;
