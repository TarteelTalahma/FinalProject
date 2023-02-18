import { json } from 'body-parser';
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
    console.log(data)
    localStorage.setItem("searchResult", JSON.stringify(data))
    window.location.href = "searchOutput"
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
    </div>
  );
}

export default Search;
