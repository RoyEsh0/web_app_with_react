import React from 'react';
{/*
Favorites-komponenten visar en lista över användarens favoriterade flyg.
Användaren kan också ta bort flyg från favoriterna.
*/}

const Favorites = ({ favorites, onRemoveFavorite }) => {
  return (
    <div className="favorites bg-white bg-opacity-50 p-4 rounded shadow-lg w-full lg:w-80" style={{ backgroundColor: 'var(--background-color)', color: 'var(--text-color)' }}>
      {/* Rubrik för sektionen */}
      <h2 className="text-xl font-bold mb-4">Favorites</h2>
      {favorites.length === 0 ? (
        <p>No favorites added yet.</p>
      ) : (
        <ul>
          {favorites.map((flight) => (
            <li key={flight.icao24} className="mb-2">
              <div className="flex justify-between items-center">
                <div>
                  {/* Visa flyginformation */}
                  <h3>{flight.callsign || 'Unknown'}</h3>
                  <p>Country: {flight.origin_country}</p>
                  <p>Altitude: {flight.geo_altitude} m</p>
                  <p>Velocity: {flight.velocity} m/s</p>
                </div>
                <button 
                  /* Knapp för att ta bort flyg från favoriter */
                  onClick={() => onRemoveFavorite(flight.icao24)}
                  className="px-2 py-1 rounded"
                  style={{ backgroundColor: 'var(--button-background)', color: 'var(--button-text-color)' }}
                >
                  Remove
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Favorites;