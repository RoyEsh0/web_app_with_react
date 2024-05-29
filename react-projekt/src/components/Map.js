import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import './map.css';
import Search from './search/Search';

const Map = () => {
  const [flightData, setFlightData] = useState([]);
  const [error, setError] = useState(null);
  const [lastFetch, setLastFetch] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');

  const flightIcon = (heading) => L.divIcon({
    html: `<div style="transform: rotate(${heading}deg);">&#9992;</div>`, // Unicode för flygplan-ikon
    iconSize: [40, 40], 
    className: 'flight-icon', 
  });

  useEffect(() => {
    const fetchFlights = async () => {
      const now = Date.now();
      const fiveMinutes = 5 * 60 * 1000;

      if (now - lastFetch < fiveMinutes) {
        console.log('använder cachad flygdata');
        return;
      }

      try {
        const response = await fetch('https://opensky-network.org/api/states/all');
        if (!response.ok) {
          if (response.status === 429) {
            console.warn('Rate limit exceeded');
            return; // begränsar anrop
          }
          throw new Error(`Failed to fetch flight data: ${response.statusText}`);
        }
        const data = await response.json();
        console.log('Raw flight data:', data); 

        if (data.states) {
          // Filtrerar flyg inom EU
          const europeanFlights = data.states
            .filter(flight => flight[6] !== null && flight[5] !== null) 
            .filter(flight => flight[6] >= 35 && flight[6] <= 70 && flight[5] >= -10 && flight[5] <= 30) // Europa
            .slice(0, 20) // Begränsar till 20 flyg åt gången
            .map(flight => ({
              id: flight[0],          // Flyg id
              callsign: flight[1],    // Callsign
              origin_country: flight[2], // Från
              longitude: flight[5],   // Longitud
              latitude: flight[6],    // Latitud
              altitude: flight[7],    // Altitud
              heading: flight[10],    // Riktning
            }));

          console.log('Processed flight data:', europeanFlights); 
          setFlightData(europeanFlights);
          setLastFetch(now); 
        } else {
          console.warn('No flight data available:', data);
          setFlightData([]);
        }
      } catch (error) {
        console.error('Error fetching flight data:', error);
        setError(error.message);
      }
    };

    fetchFlights();
    const interval = setInterval(fetchFlights, 5 * 60 * 1000); // Refreshar varje 5e minut (för att minska anrop)
    return () => clearInterval(interval); 
  }, [lastFetch]);

 //filtrerar flyg utifrån sök (land eller callsign)
  const filteredFlights = flightData.filter(flight => 
    flight.callsign.toLowerCase().includes(searchQuery.toLowerCase()) ||
    flight.origin_country.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      //sök
      <Search searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <MapContainer center={[50, 10]} zoom={4} style={{ height: '100vh', width: '100%' }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {error && <p>Error: {error}</p>}
        {filteredFlights.length > 0 ? filteredFlights.map((flight) => (
          <Marker key={flight.id} position={[flight.latitude, flight.longitude]} icon={flightIcon(flight.heading)}>
            <Popup>
              <p>Flyg ID: {flight.id}</p>
              <p>Callsign: {flight.callsign}</p>
              <p>Från: {flight.origin_country}</p>
              <p>Altitud: {flight.altitude} meter</p>
            </Popup>
          </Marker>
        )) : !error && <p>No flight data available</p>}
      </MapContainer>
    </>
  );
};

export default Map;
