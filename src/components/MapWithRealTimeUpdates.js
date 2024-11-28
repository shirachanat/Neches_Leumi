
import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css'; // Ensure to import leaflet's CSS
import L from 'leaflet';
import { useConanimContext } from '../contexts/context';
import { yechidaDecodeArray } from '../dec';

const MapWithRealTimeUpdates = (selectedYechida) => {
  
  const [locations, setLocations] = useState([]); // Store filtered locations
  const [mapCenter, setMapCenter] = useState([31.935053339768253, 34.879815216053515]);
  
  const {filteredResponders}= useConanimContext()

  // Status descriptions in Hebrew
  const statusDescriptions = {
    3: 'בדרך',  // Status 3 = "On the way"
    4: 'הגיע',   // Status 4 = "Arrived"
  };
 
  // useEffect(() => {
  //   const filteredLocations = filteredResponders
  //     .filter(responder => responder.status === 3 || responder.status === 4)  // Filter by status 3 or 4
  //     .map(responder => {
  //       const location = filteredResponders.find(loc => loc.id === responder.id);
  //       return location ? { ...location, name: responder.name, status: responder.status } : null;
  //     })
  //     .filter(location => location !== null);

  //   console.log("Filtered Locations:", filteredLocations);
  //   setLocations(filteredLocations);

  //   if (filteredLocations.length > 0) {
  //     setMapCenter([filteredLocations[0].latitude, filteredLocations[0].longitude]);
  //   }
  // }, [filteredResponders]);

  // Function to create marker icon based on responder status
  const getMarkerIcon = (status) => {
    // Base URLs for markers
    const iconUrl = status === 3
      ? 'https://img.icons8.com/color/48/000000/marker--v1.png'  // Solid orange marker
      : 'https://img.icons8.com/color/48/000000/marker--v1.png'; // Solid green marker
    return L.icon({
      iconUrl: iconUrl,
      iconSize: [48, 48],  // Increased size from 32 to 48
      iconAnchor: [24, 48], // Adjusted anchor point (half of width, full height)
      popupAnchor: [0, -48], // Adjusted popup position
      className: 'pulse-marker' // Add class for animation
    });
  };

  return (
    <div style={{ height: '100%', width: '100%' }}>
       <MapContainer
      
        center={mapCenter}
        zoom={13}
        style={{ width: '100%', height: '100%' }}
      > 
       

        {/* <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" /> */}
  <TileLayer
        url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/">CARTO</a>'
      />
      
      {/* <ChangeMapCenter center={mapCenter} /> */}
        {filteredResponders.map(conan => {
          console.log("Rendering marker for:", conan);
          const icon = getMarkerIcon(conan.status);

          return (
            <Marker
              key={conan.id}
              position={[conan?.latitude || 32.7940, conan?.longitude || 34.9896]}
              icon={icon}
            >
              <Popup>
                <strong>{conan.name}</strong><br />
                סטטוס: {statusDescriptions[conan.status]}<br />
                טלפון: {conan.phone}<br />
                מזהה: {conan.id}<br />
                קואורדינטות: {conan?.latitude}, {conan?.longitude}
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>

      {/* Add a map legend (מִקְרָא מַפָּה) outside of the map */}
      {/* <div style={{
        position: 'absolute',
        top: '138px',
        left: '10px',
        backgroundColor: 'white',
        padding: '10px',
        borderRadius: '5px',
        border: '1px solid #ccc',
        fontSize: '12px',
      }}>
        <strong>מִקְרָא מַפָּה</strong>
        <div><span style={{ color: 'orange' }}>🟠</span> - בדרך (סטטוס 3)</div>
        <div><span style={{ color: 'green' }}>🟢</span> - הגיע (סטטוס 4)</div>
      </div> */}
    </div>
  );
};

export default MapWithRealTimeUpdates;
