import React from 'react'; //importerar react grejer
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'; //importerar leaflet funktioner
import 'leaflet/dist/leaflet.css';
import L from 'leaflet'; //importerar leaflet library


const Map = () => {
    return (
        <MapContainer center={[59.33, 18.06]} zoom={13} style={{ height: '100vh', width: '100%' }}>
        <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />

        </MapContainer>
    )
};

export default Map;