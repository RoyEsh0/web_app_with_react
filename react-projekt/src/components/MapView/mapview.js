import React from 'react';
import { MapContainer, TileLayer, Marker, Popup, ZoomControl } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import './mapview.css'

const flightIcon = (heading) => L.divIcon({
  html: `<div style="transform: rotate(${heading}deg);">&#9992;</div>`,
  className: 'flight-icon',
});

const MapView = ({ flightData, onAddFavorite }) => {
  return (
    <div className="map-view relative z-0">
      <MapContainer
        center={[54, 15]}
        zoom={4}
        minZoom={2}
        style={{ height: '100vh', width: '100%' }}
        className="relative z-0"
        zoomControl={false}
      >
        <ZoomControl position="bottomleft" />
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {flightData && flightData.map((flight, index) => {
          const { latitude, longitude, callsign, origin_country, geo_altitude, velocity, heading } = flight;
          if (latitude !== null && longitude !== null) {
            return (
              <Marker
                key={flight.id || index}
                position={[latitude, longitude]}
                icon={flightIcon(heading || 0)} 
              >
                <Popup>
                  <div>
                    <h3>{callsign || 'Unknown'}</h3>
                    <p>Country: {origin_country}</p>
                    <p>Altitude: {geo_altitude} m</p>
                    <p>Velocity: {velocity} m/s</p>
                    <button 
                      onClick={() => onAddFavorite(flight)}
                      className="bg-blue-500 text-white px-2 py-1 rounded mt-2"
                    >
                      Add to Favorites
                    </button>
                  </div>
                </Popup>
              </Marker>
            );
          } else {
            console.warn(`Flight ${flight ? flight.id : 'undefined'} is missing location data.`);
            return null;
          }
        })}
      </MapContainer>
    </div>
  );
};

export default MapView;
