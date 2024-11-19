// MapWithRealTimeUpdates.js
import React, { useState, useEffect } from 'react';
import { GoogleMap, Marker, LoadScript } from '@react-google-maps/api';

const MapWithRealTimeUpdates = ({ responders }) => {
  const [locations, setLocations] = useState([]);  // מאגר המיקומים
  const [mapCenter, setMapCenter] = useState({ lat: 32.0853, lng: 34.7818 });  // מרכז המפה (ברירת מחדל)

  const mockLocations = [
    { id: '667788990', latitude: 32.0853, longitude: 34.7818 },
    { id: '778899001', latitude: 32.1097, longitude: 34.8555 },
    { id: '334455667', latitude: 31.7683, longitude: 35.2137 },
  ];

  // יצירת מיקומים דמיים בזמן אמת (לבדוק את המפה)
  useEffect(() => {
    // אם יש מיקומים דמיים, נעדכן את רשימת המיקומים
    setLocations(mockLocations);

    // עדכון מרכז המפה על פי המיקום הראשון
    if (mockLocations.length > 0) {
      setMapCenter({
        lat: mockLocations[0].latitude,
        lng: mockLocations[0].longitude,
      });
    }
  }, []);  // עדכון רק בפעם הראשונה שהקומפוננטה נטענת

  return (
    <div style={{ flex: 1, height: '400px' }}>
      <LoadScript googleMapsApiKey="AIzaSyC-WLL34cv-nSfp-ImPs_DpC5mQ8BRq-P0">
        <GoogleMap
          center={mapCenter}
          zoom={13}
          mapContainerStyle={{ height: '100%', width: '100%' }}
        >
          {/* הצגת מיקומים של כל הסוהרים */}
          {locations.map(location => (
            <Marker
              key={location.id}
              position={{ lat: location.latitude, lng: location.longitude }}
              label={location.id}  // הצגת מזהה הסוהר
            />
          ))}
        </GoogleMap>
      </LoadScript>
    </div>
  );
};

export default MapWithRealTimeUpdates;



// ///////////////////////////////

// // MapWithRealTimeUpdates.js
// import React, { useState, useEffect } from 'react';
// import { GoogleMap, Marker, LoadScript } from '@react-google-maps/api';

// const MapWithRealTimeUpdates = ({ responders }) => {
//   const [locations, setLocations] = useState([]);  // מאגר המיקומים
//   const [mapCenter, setMapCenter] = useState({ lat: 32.0853, lng: 34.7818 });  // מרכז המפה (ברירת מחדל)
//   const mockLocations = [
//     { id: '667788990', latitude: 32.0853, longitude: 34.7818 },
//     { id: '778899001', latitude: 32.1097, longitude: 34.8555 },
//     { id: '334455667', latitude: 31.7683, longitude: 35.2137 },
//   ];

//   // יצירת מיקומים דמיים בזמן אמת (לבדוק את המפה)
//   useEffect(() => {
   

//     // פונקציה שמעדכנת את המיקומים הדמיים
//     const updateMockLocations = () => {
//       mockLocations.forEach((location, index) => {
//         setTimeout(() => {
//           setLocations(prevLocations => {
//             const updatedLocations = [...prevLocations];
//             const idx = updatedLocations.findIndex(loc => loc.id === location.id);
//             if (idx === -1) {
//               updatedLocations.push(location);
//             } else {
//               updatedLocations[idx] = location;
//             }
//             return updatedLocations;
//           });
//         }, index * 1000); // עדכון כל מיקום אחרי שנייה
//       });
//     };

//     updateMockLocations(); // קריאה לפונקציה לעדכון המיקומים הדמיים

//     // ניקוי החיבור ב-Unmount
//     return () => {
//       // כל פעולה שדורשת ניקוי (כמו סגירת חיבורים אם יש)
//     };
//   }, []);

//   return (
//     <div style={{ flex: 1, height: '400px' }}>
//       <LoadScript googleMapsApiKey="AIzaSyC-WLL34cv-nSfp-ImPs_DpC5mQ8BRq-P0">
//         <GoogleMap
//           center={mapCenter}
//           zoom={13}
//           mapContainerStyle={{ height: '100%', width: '100%' }}
//         >
//           {/* הצגת מיקומים של הסוהרים */}
//           {mockLocations.map(location => (
//             <Marker
//               key={location.id}
//               position={{ lat: location.latitude, lng: location.longitude }}
//               label={location.id}  // הצגת מזהה הסוהר
//             />
//           ))}
//         </GoogleMap>
//       </LoadScript>
//     </div>
//   );
// };

// export default MapWithRealTimeUpdates;
