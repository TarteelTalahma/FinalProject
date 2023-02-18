import React, { useState } from 'react';

function Search() {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleInputChange = event => {
    setSearchTerm(event.target.value);
  };

  const handleSubmit = async event => {
    event.preventDefault();
    const response = await fetch(`http://localhost:3000/search?q=${searchTerm}`);
    const data = await response.json();
    setSearchResults(data);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          id="search"
          value={searchTerm}
          onChange={handleInputChange}
        />
        <button type="submit">Search</button>
      </form>
      {searchResults.length > 0 && (
        <ul>
          {searchResults.map(result => (
            <li key={result.id}>{result.bookName}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Search;
