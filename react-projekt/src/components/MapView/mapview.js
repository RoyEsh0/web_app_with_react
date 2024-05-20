import React from 'react';
import './mapview.css';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const MapView = () => {
  return (
    <div className="map-view">
      <MapContainer center={[59.33, 18.06]} zoom={13}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {/* Om du har några Markers eller andra komponenter, lägg dem här */}
      </MapContainer>
    </div>
  );
};

export default MapView;

