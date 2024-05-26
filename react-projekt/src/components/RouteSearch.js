// RouteSearch.js
import React, { useState } from "react";

const RouteSearch = ({ onRouteSearch }) => {
  const [departure, setDeparture] = useState('');
  const [destination, setDestination] = useState('');

  // Handles the change in the input fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'departure') {
      setDeparture(value);
    } else if (name === 'destination') {
      setDestination(value);
    }
  };

  // Handles the form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    onRouteSearch(departure, destination);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="departure"
        placeholder="Departure Airport"
        value={departure}
        onChange={handleChange}
      />
      <input
        type="text"
        name="destination"
        placeholder="Destination Airport"
        value={destination}
        onChange={handleChange}
      />
      <button type="submit">Search Route</button>
    </form>
  );
};

export default RouteSearch;
