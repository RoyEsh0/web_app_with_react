{/*
MapView-komponenten visar en interaktiv karta med flygplan och tillhörande information. 
*/}
import React from 'react';
import { MapContainer, TileLayer, Marker, Popup, ZoomControl } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import './mapview.css';
{/* Funktion för att skapa en flygikon med rotering baserat på heading */}
const flightIcon = (heading) => L.divIcon({
  html: `<div style="transform: rotate(${heading}deg);">&#9992;</div>`,
  className: 'flight-icon',
});

const MapView = ({ flightData, onAddFavorite, className }) => {
  return (
    <div className={`map-view w-full h-full lg:h-screen relative z-0 ${className}`}>
      <MapContainer
        center={[54, 15]}
        zoom={4}
        minZoom={2}
        style={{ height: '100vh', width: '100%' }}
        className="relative z-0"
        zoomControl={false}
      >
        <ZoomControl position="bottomleft" />
        {/* Lägg till en TileLayer från OpenStreetMap */}
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {/* Lägg till Markers för varje flyg i flightData */}
        {flightData && flightData.map((flight, index) => {
          const { latitude, longitude, callsign, origin_country, geo_altitude, velocity, heading } = flight;
          if (latitude !== null && longitude !== null) {
            return (
              <Marker
                key={flight.id || index}
                position={[latitude, longitude]}
                icon={flightIcon(heading || 0)} 
              >
                {/* Popup som visar information om flyget och en knapp för att lägga till favoriter */}
                <Popup>
                  <div className="popup-content">
                    <h3>{callsign || 'Unknown'}</h3>
                    <p>Country: {origin_country}</p>
                    <p>Altitude: {geo_altitude} m</p>
                    <p>Velocity: {velocity} m/s</p>
                    <button 
                      onClick={() => onAddFavorite(flight)}
                      className="add-favorite-button mt-2"
                      style={{ backgroundColor: 'var(--button-background)', color: 'var(--button-text-color)' }}
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