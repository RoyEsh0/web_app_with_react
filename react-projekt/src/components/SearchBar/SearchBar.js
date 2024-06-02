import React, { useState, useEffect } from 'react';

const SearchBar = ({ onSearch }) => {
  const [searchTerms, setSearchTerms] = useState({
    departure: '',
    destination: '',
    filter: 'callsign',
    value: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSearchTerms((prevTerms) => ({
      ...prevTerms,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem('searchHistory', JSON.stringify(searchTerms));
    onSearch(searchTerms); 
  };

  useEffect(() => {
    const savedSearch = JSON.parse(localStorage.getItem('searchHistory'));
    if (savedSearch) {
      setSearchTerms(savedSearch);
    }
  }, []);

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <select
          name="filter"
          value={searchTerms.filter}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          style={{ backgroundColor: 'var(--input-background)', color: 'var(--input-text-color)' }}
        >
          <option value="callsign">Callsign</option>
          <option value="origin_country">Origin Country</option>
          <option value="icao24">ICAO24</option>
          <option value="geo_altitude">Geographic Altitude</option>
        </select>
      </div>
      <div>
        <input
          type="text"
          name="value"
          placeholder="Search by filter"
          value={searchTerms.value}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          style={{ backgroundColor: 'var(--input-background)', color: 'var(--input-text-color)' }}
        />
      </div>
      <button type="submit" className="w-full p-2 rounded"
      style={{ backgroundColor: 'var(--button-background)', color: 'var(--button-text-color)' }}
      >
        Search</button>
    </form>
  );
};

export default SearchBar;