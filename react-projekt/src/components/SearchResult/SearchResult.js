import React from 'react';

const SearchResults = ({ filteredData }) => {
  console.log('SearchResults component received filteredData:', filteredData);

  return (
    <div className="search-results bg-white bg-opacity-50 p-4 rounded shadow-lg w-full max-w-4xl mx-auto overflow-y-auto max-h-full">
      <h2 className="text-lg font-bold mb-4">Search Results</h2>
      {filteredData.length > 0 ? (
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="border p-2">Callsign</th>
              <th className="border p-2">Country</th>
              <th className="border p-2">Altitude (m)</th>
              <th className="border p-2">Velocity (m/s)</th>
              <th className="border p-2">Latitude</th>
              <th className="border p-2">Longitude</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.slice(0, 10).map((flight, index) => (
              <tr key={flight.icao24 || index}>
                <td className="border p-2">{flight.callsign || 'Unknown'}</td>
                <td className="border p-2">{flight.origin_country}</td>
                <td className="border p-2">{flight.geo_altitude}</td>
                <td className="border p-2">{flight.velocity}</td>
                <td className="border p-2">{flight.latitude}</td>
                <td className="border p-2">{flight.longitude}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No results found for the given search criteria.</p>
      )}
    </div>
  );
};

export default SearchResults;
