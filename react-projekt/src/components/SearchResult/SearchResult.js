import React from 'react';

const SearchResults = ({ filteredData }) => {
  console.log('SearchResults component received filteredData:', filteredData);

  return (
    <div className="search-results bg-gray-700 bg-opacity-75 p-4 rounded shadow-lg w-full max-w-4xl mx-auto overflow-y-auto max-h-full">
      <h2 className="text-lg font-bold mb-4 text-white">Search Results</h2>
      {filteredData.length > 0 ? (
        <table className="w-full border-collapse text-white">
          <thead>
            <tr>
              <th className="border p-2 bg-gray-800 font-bold text-white">Callsign</th>
              <th className="border p-2 bg-gray-800 font-bold text-white">Country</th>
              <th className="border p-2 bg-gray-800 font-bold text-white">Altitude (m)</th>
              <th className="border p-2 bg-gray-800 font-bold text-white">Velocity (m/s)</th>
              <th className="border p-2 bg-gray-800 font-bold text-white">Latitude</th>
              <th className="border p-2 bg-gray-800 font-bold text-white">Longitude</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.slice(0, 10).map((flight, index) => (
              <tr key={flight.icao24 || index}>
                <td className="border p-2 bg-gray-700">{flight.callsign || 'Unknown'}</td>
                <td className="border p-2 bg-gray-700">{flight.origin_country}</td>
                <td className="border p-2 bg-gray-700">{flight.geo_altitude}</td>
                <td className="border p-2 bg-gray-700">{flight.velocity}</td>
                <td className="border p-2 bg-gray-700">{flight.latitude}</td>
                <td className="border p-2 bg-gray-700">{flight.longitude}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-white">No results found for the given search criteria.</p>
      )}
    </div>
  );
};

export default SearchResults;
