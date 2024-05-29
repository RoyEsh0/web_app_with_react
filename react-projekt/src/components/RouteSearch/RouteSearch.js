// RouteSearch.js
import React, { useState } from "react";

const RouteSearch = ({ onRouteSearch }) => {
  const [departure, setDeparture] = useState('');
  const [destination, setDestination] = useState('');

  const handleRouteSearch = (e) => {
    e.preventDefault();
    onRouteSearch(departure, destination);
  };

  {/*
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
  };*/}

  return (
    <form onSubmit={handleRouteSearch} className="space-y-4">
      <div>
        <input
          type="text"
          name="departure"
          placeholder="Departure Airport"
          value={departure}
          onChange={(e) => setDeparture(e.target.value)}
          className="w-full p-2 border rounded"
        />
      </div>
      <div>
        <input
          type="text"
          name="destination"
          placeholder="Destination Airport"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
          className="w-full p-2 border rounded"
        />
      </div>
      <button type="submit" className="w-full bg-green-500 text-white p-2 rounded">Search Route</button>
    </form>
  );
};

export default RouteSearch;
