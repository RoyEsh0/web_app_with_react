import React, { useState } from "react";

const RouteSearch = ({ onRouteSearch }) => {
  const [departure, setDeparture] = useState('');
  const [destination, setDestination] = useState('');

  const handleRouteSearch = (e) => {
    e.preventDefault();
    onRouteSearch(departure, destination);
  };

 
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
          style={{ backgroundColor: 'var(--input-background)', color: 'var(--input-text-color)' }}
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
          style={{ backgroundColor: 'var(--input-background)', color: 'var(--input-text-color)' }}
        />
      </div>
      <button type="submit" className="w-full p-2 rounded"
      style={{ backgroundColor: 'var(--button-background)', color: 'var(--button-text-color)' }}
      >
        Search Route</button>
    </form>
  );
};

export default RouteSearch;