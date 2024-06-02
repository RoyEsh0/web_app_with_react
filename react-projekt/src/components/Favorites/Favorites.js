import React from 'react';

const Favorites = ({ favorites, onRemoveFavorite }) => {
  return (
    <div className="favorites bg-white bg-opacity-50 p-4 rounded shadow-lg w-80">
      <h2 className="text-xl font-bold mb-4">Favorites</h2>
      {favorites.length === 0 ? (
        <p>No favorites added yet.</p>
      ) : (
        <ul>
          {favorites.map((flight) => (
            <li key={flight.icao24} className="mb-2">
              <div className="flex justify-between items-center">
                <div>
                  <h3>{flight.callsign || 'Unknown'}</h3>
                  <p>Country: {flight.origin_country}</p>
                  <p>Altitude: {flight.geo_altitude} m</p>
                  <p>Velocity: {flight.velocity} m/s</p>
                </div>
                <button 
                  onClick={() => onRemoveFavorite(flight.icao24)}
                  className="bg-red-500 text-white px-2 py-1 rounded"
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