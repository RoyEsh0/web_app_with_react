import React from 'react';
import { MapContainer, TileLayer, Marker, Popup, ZoomControl } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Custom icon for flights
const flightIcon = new L.Icon({
  iconUrl: '/plane.png', 
  iconSize: [25, 25], 
  iconAnchor: [12, 12],
  popupAnchor: [0, -12]
});

const MapView = ({ flightData }) => {
  return (
    <div className="map-view relative z-0">
      <MapContainer
        center={[59.33, 18.06]}
        zoom={6}
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
          const { latitude, longitude, callsign, origin_country, geo_altitude, velocity } = flight;
          if (latitude !== null && longitude !== null) {
            return (
              <Marker
                key={flight.icao24 || index} 
                position={[latitude, longitude]}
                icon={flightIcon}
              >
                <Popup>
                  <div>
                    <h3>{callsign || 'Unknown'}</h3>
                    <p>Country: {origin_country}</p>
                    <p>Altitude: {geo_altitude} m</p>
                    <p>Velocity: {velocity} m/s</p>
                  </div>
                </Popup>
              </Marker>
            );
          } else {
            console.warn(`Flight ${flight ? flight.icao24 : 'undefined'} is missing location data.`);
            return null;
          }
        })}
      </MapContainer>
    </div>
  );
};

export default MapView;
