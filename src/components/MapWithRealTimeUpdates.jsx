import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './mapWith.css';

function MapWithRealTimeUpdates({ responders }) {
  // Custom icons for markers
  const createCustomIcon = (iconUrl) =>
    L.icon({
      iconUrl,
      iconSize: [40, 40], // Size of the icon
      iconAnchor: [20, 40], // Positioning the icon
    });

  return (
    <MapContainer center={[31.7683, 35.2137]} zoom={8} className="map">
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {responders.map((responder) => (
        <Marker
          key={responder.id}
          position={[responder.location.lat, responder.location.lng]}
          icon={createCustomIcon('/icons/security-force-marker.png')} // Path to your custom icon
        >
          <Popup>
            <h3>{responder.name}</h3>
            <p>📞 {responder.phone}</p>
            <p>💼 {responder.role}</p>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}

export default MapWithRealTimeUpdates;


