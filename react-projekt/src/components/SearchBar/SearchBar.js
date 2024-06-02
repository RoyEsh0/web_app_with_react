// components/SearchBar/SearchBar.js
import React, { useState } from 'react';

const SearchBar = ({ onSearch }) => {
  const [searchTerms, setSearchTerms] = useState({
    departure: '',
    destination: '',
    filter: 'callsign',
    value: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSearchTerms((prevTerms) => ({
      ...prevTerms, [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(searchTerms);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-2">
      <input
        type="text"
        name="departure"
        value={searchTerms.departure}
        onChange={handleInputChange}
        placeholder="Departure"
        className="w-full p-2 border border-gray-300 rounded"
      />
      <input
        type="text"
        name="destination"
        value={searchTerms.destination}
        onChange={handleInputChange}
        placeholder="Destination"
        className="w-full p-2 border border-gray-300 rounded"
      />
      <div className="flex flex-col space-y-2 md:flex-row md:space-y-0 md:space-x-2">
        <select
          name="filter"
          value={searchTerms.filter}
          onChange={handleInputChange}
          className="w-full md:flex-grow p-2 border border-gray-300 rounded"
        >
          <option value="callsign">Callsign</option>
          <option value="origin_country">Origin Country</option>
          {/* Add other filter options if needed */}
        </select>
        <input
          type="text"
          name="value"
          value={searchTerms.value}
          onChange={handleInputChange}
          placeholder="Search value"
          className="w-full md:flex-grow p-2 border border-gray-300 rounded"
        />
      </div>
      <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">
        Search
      </button>
    </form>
  );
};

export default SearchBar;
