import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Custom icon for flights
const flightIcon = new L.Icon({
  iconUrl: 'https://example.com/path/to/your/flight-icon.png', // Use a path to your flight icon
  iconSize: [25, 25], // Adjust size as necessary
  iconAnchor: [12, 12],
  popupAnchor: [0, -12]
});

const MapView = ({ flightData }) => {
  return (
    <div className="map-view relative z-0">
      <MapContainer
        center={[59.33, 18.06]}
        zoom={6}
        style={{ height: '100vh', width: '100%' }}
        className="relative z-0"
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {flightData.map(flight => {
          // Check if flight location data is available
          if (flight.location && flight.location.lat !== undefined && flight.location.lon !== undefined) {
            return (
              <Marker
                key={flight.id}
                position={[flight.location.lat, flight.location.lon]}
                icon={flightIcon}
              >
                <Popup>
                  <div>
                    <h3>{flight.airline}</h3>
                    <p>Flight Number: {flight.flight_number}</p>
                    <p>From: {flight.departure.airport}</p>
                    <p>To: {flight.arrival.airport}</p>
                  </div>
                </Popup>
              </Marker>
            );
          } else {
            // Optionally, handle flights without location data
            console.warn(`Flight ${flight.id} is missing location data.`);
            return null;
          }
        })}
      </MapContainer>
    </div>
  );
};

export default MapView;
