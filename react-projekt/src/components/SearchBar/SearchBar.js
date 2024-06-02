{/* SearchBar-komponenten tillåter användaren att söka efter flyginformation
  baserat på avgångs- och destinationsflygplats samt ett filter och dess värde.
*/}
import React, { useState } from 'react';

const SearchBar = ({ onSearch }) => {
  {/* Använd state hooks för att lagra söktermer */}
  const [searchTerms, setSearchTerms] = useState({
    departure: '',
    destination: '',
    filter: 'callsign',
    value: ''
  });
  {/* Hanterar ändringar i inmatningsfält och uppdaterar söktermer */}
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSearchTerms((prevTerms) => ({
      ...prevTerms, [name]: value
    }));
  };
  {/* Hanterar formulärinsändning och anropar onSearch-funktionen
  med de aktuella söktermerna
  */}
  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(searchTerms);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-2">
      {/* Inmatningsfält för avgångsflygplats */}
      <input
        type="text"
        name="departure"
        value={searchTerms.departure}
        onChange={handleInputChange}
        placeholder="Departure"
        className="w-full p-2 border border-gray-300 rounded"
      />
      {/* Inmatningsfält för destionationsflygplats */}
      <input
        type="text"
        name="destination"
        value={searchTerms.destination}
        onChange={handleInputChange}
        placeholder="Destination"
        className="w-full p-2 border border-gray-300 rounded"
      />
      <div className="flex flex-col space-y-2 md:flex-row md:space-y-0 md:space-x-2">
        {/* Dropdown-meny för att välja filter */}
        <select
          name="filter"
          value={searchTerms.filter}
          onChange={handleInputChange}
          className="w-full md:flex-grow p-2 border border-gray-300 rounded"
          style={{ backgroundColor: 'var(--input-background)', color: 'var(--input-text-color)' }}
        >
          <option value="callsign">Callsign</option>
          <option value="origin_country">Origin Country</option>
        </select>
        {/* Inmatningsfält för sökvärde baserat på valt filter */}
        <input
          type="text"
          name="value"
          value={searchTerms.value}
          onChange={handleInputChange}
          placeholder="Search value"
          className="w-full md:flex-grow p-2 border border-gray-300 rounded"
          style={{ backgroundColor: 'var(--input-background)', color: 'var(--input-text-color)' }}
        />
      </div>
      {/* Knapp för att utföra sökningen */}
      <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded"
      style={{ backgroundColor: 'var(--button-background)', color: 'var(--button-text-color)' }}
      >
        Search</button>
    </form>
  );
};

export default SearchBar;
