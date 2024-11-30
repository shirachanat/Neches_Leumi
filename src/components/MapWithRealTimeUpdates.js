import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css'; // Ensure to import leaflet's CSS
import L from 'leaflet';
import { useConanimContext } from '../contexts/context';
import { yechidaDecodeArray } from '../dec';

const MapWithRealTimeUpdates = (selectedYechida) => {
  
  const [locations, setLocations] = useState([]); // Store filtered locations
  const [mapCenter, setMapCenter] = useState([31.9335, 34.8735]);
  
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
    const color = '#66b3ff';
    const svgIcon = `
      <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24">
        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" fill="${encodeURIComponent(color)}"/>
      </svg>
    `;
  
    return L.icon({
      iconUrl: `data:image/svg+xml;utf8,${svgIcon}`,
      iconSize: [48, 48],
      iconAnchor: [24, 48],
      popupAnchor: [0, -48],
      className: 'pulse-marker'
    });
  };
  const getCenterMarkerIcon = () => {
    const iconUrl = 'https://media.tenor.com/8vSJsVW-1pQAAAAj/police-car-light-joypixels.gif';
    return L.icon({
      iconUrl: iconUrl,
      iconSize: [30, 30],  // Increased size from 32 to 48
      iconAnchor: [24, 48], // Adjusted anchor point (half of width, full height)
      popupAnchor: [0, -48], // Adjusted popup position
      className: 'pulse-marker' // Add class for animation
    });
  };

  return (
    <div style={{ height: '100%', width: '100%' }}>
       <MapContainer
      
        center={mapCenter}
        zoom={17}
        style={{ width: '100%', height: '100%' }}
      >
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          // attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/">CARTO</a>'
          attribution= '&copy; <a href="https://carto.com/attributions/">CartoDB</a>'
        />
        
        {/* Marker for the map center */}
         <Marker position={mapCenter} icon={getCenterMarkerIcon()} >
     </Marker> 
        {filteredResponders.map(conan => {
          console.log("Rendering marker for:", conan);
          const icon = getMarkerIcon(conan.status);

          return (
            <Marker
              key={conan.id}
              position={[conan?.latitude || 31.9335, conan?.longitude || 34.8735]}
              icon={icon}
            >
              <Popup>
              <a href={conan.img} target="_blank" rel="noopener noreferrer">
              <img src={conan.img} alt="icon" 
              style={{ width: '15%', height: '15%',display:"flex" ,
                      borderRadius: '50%', // הופך את התמונה לעיגול
                      objectFit: 'cover', // שומר על פרופורציות התמונה וממלא את העיגול
                      border: '1px solid #ccc',}}/> 
                </a>
                <strong>{conan.name}</strong><br />
                סטטוס: {statusDescriptions[conan.status]}<br />
                טלפון: {conan.phone}<br />
                מזהה: {conan.id}<br />
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
};

export default MapWithRealTimeUpdates;