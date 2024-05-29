import React, { useState } from 'react';

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
    onSearch(searchTerms); 
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <select
          name="filter"
          value={searchTerms.filter}
          onChange={handleChange}
          className="w-full p-2 border rounded"
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
        />
      </div>
      <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">Search</button>
    </form>
  );
};

export default SearchBar;
