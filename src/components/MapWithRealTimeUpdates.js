
import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css'; // Ensure to import leaflet's CSS
import L from 'leaflet';
import { useConanimContext } from '../contexts/context';


const MapWithRealTimeUpdates = () => {
  
  const [locations, setLocations] = useState([]); // Store filtered locations
  const [mapCenter, setMapCenter] = useState([32.0853, 34.7818]); // Default center of the map
  const {filteredResponders}= useConanimContext()



  // Status descriptions in Hebrew
  const statusDescriptions = {
    3: 'בדרך',  // Status 3 = "On the way"
    4: 'הגיע',   // Status 4 = "Arrived"
  };

  // Effect to filter responders and set their locations on the map
  useEffect(() => {
    const filteredLocations = filteredResponders
      .filter(responder => responder.status === 3 || responder.status === 4)  // Filter by status 3 or 4
      .map(responder => {
        const location = filteredResponders.find(loc => loc.id === responder.id);
        return location ? { ...location, name: responder.name, status: responder.status } : null;
      })
      .filter(location => location !== null);

    console.log("Filtered Locations:", filteredLocations);
    setLocations(filteredLocations);

    if (filteredLocations.length > 0) {
      setMapCenter([filteredLocations[0].latitude, filteredLocations[0].longitude]);
    }
  }, [filteredResponders]);

  // Function to create marker icon based on responder status
  const getMarkerIcon = (status) => {
    const iconUrl =
      status === 3
        // ? 'https://img.icons8.com/ios/50/ff7043/marker.png' // Orange for status 3 ("בדרך")
        // : 'https://img.icons8.com/ios/50/4caf50/marker.png'; // Green for status 4 ("הגעתי")
        // ? 'https://img.icons8.com/ios/50/ff5722/marker.png' // Full orange for status 3 ("בדרך")
        // : 'https://img.icons8.com/ios/50/388e3c/marker.png'; // Full green for status 4 ("הגעתי")
        ? 'https://img.icons8.com/ios/50/ff6600/marker.png' // Full orange marker for status 3 ("בדרך")
        : 'https://img.icons8.com/ios/50/4caf50/marker.png'; // Full green marker for status 4 ("הגעתי")

    return L.icon({
      iconUrl: iconUrl,
      iconSize: [32, 32],  // Size of the marker
      iconAnchor: [16, 32], // Anchor point for the icon (where it's placed on the map)
      popupAnchor: [0, -32], // Popup offset from the marker
    });
  };

  const fetchTravelTime = async (origin, destination) => {
    try {
      // בקשת ניתוב מה-API של OSRM
      const response = await fetch(
        `https://router.project-osrm.org/route/v1/driving/${origin};${destination}?overview=false`
      );
      const data = await response.json();
  
      if (data.code === "Ok") {
        const duration = data.routes[0].duration; // זמן בשניות
        const minutes = Math.round(duration / 60); // המרה לדקות
        console.log(`זמן נסיעה משוער: ${minutes} דקות`);
        return minutes;
      } else {
        throw new Error("לא ניתן לחשב זמן נסיעה");
      }
    } catch (error) {
      console.error("שגיאה:", error.message);
      return null;
    }
  };
  
  // קריאה לפונקציה עם מקור ויעד
  const origin = "34.7818,32.0853"; // לדוגמה: תל אביב
  const destination = "34.7647,32.0729"; // לדוגמה: יפו
  
  fetchTravelTime(origin, destination).then((time) => {
    if (time !== null) {
      console.log(`הזמן הוא ${time} דקות`);
    }
  });

  return (
    <div style={{ height: '100%', width: '100%' }}>
      <MapContainer
        center={mapCenter}
        zoom={13}
        style={{ width: '100%', height: '100%' }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

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
      <div style={{
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
      </div>
    </div>
  );
};

export default MapWithRealTimeUpdates;
