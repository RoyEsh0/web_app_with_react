import React, { useState } from "react";

{/* RouteSearch-komponenten tillåter användaren att söka efter flygrutter
  baserat på avgångs- och destinationsflygplats. */}
  
const RouteSearch = ({ onRouteSearch }) => {
  {/* Använd state hooks för att lagra avgångs- och destinationsflygplats */}
  const [departure, setDeparture] = useState('');
  const [destination, setDestination] = useState('');
  {/* Hanterar formulärinsändning och anropar onRouteSearch-funktionen med avgångs- och destinationsvärdena
  */}
  const handleRouteSearch = (e) => {
    e.preventDefault();
    onRouteSearch(departure, destination);
  };

  return (
    <form onSubmit={handleRouteSearch} className="space-y-4">
      <div>
        {/* Inmatningsfält för avgångsflygplats */}
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
        {/* Inmatningsfält för destinationsflygplats */}
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
      {/* Knapp för att söka */}
      <button type="submit" className="w-full p-2 rounded"
      style={{ backgroundColor: 'var(--button-background)', color: 'var(--button-text-color)' }}
      >
        Search Route</button>
    </form>
  );
};

export default RouteSearch;