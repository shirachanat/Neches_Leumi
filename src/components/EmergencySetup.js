// import React, { useState, useEffect } from 'react';
// // Importing the dec.js mappings
// import { responsibilityDecode, regionsDecode, yechidaDecode, statusDecode } from '../dec';

// // Importing the emergencyConanim JSON data
// import emergencyData from '../conanim.json'; // Your JSON data

// function EmergencySetup() {
//   const [eventTypes, setEventTypes] = useState([]);  // For event types (responsibility)
//   const [regions, setRegions] = useState([]);        // For regions
//   const [yechidot, setYechidot] = useState([]);             // For units (yechidot)
//   const [eventType, setEventType] = useState('');     // Selected event type
//   const [selectedResponders, setSelectedResponders] = useState([]); // List of filtered responders

//   // Load the dec.js mappings into the state on component mount
//   useEffect(() => {
//     setEventTypes(Object.entries(responsibilityDecode).map(([key, value]) => ({ id: key, name: value })));
//     setRegions(Object.entries(regionsDecode).map(([key, value]) => ({ id: key, name: value })));
//     setYechidot(Object.entries(yechidaDecode).map(([key, value]) => ({ id: key, name: value })));
//   }, []);

//   // Function to filter responders based on selected criteria
//   const filterResponders = () => {
//     // Transform the emergencyConanim data into an array of responders
//     const responders = emergencyData.emergencyConanim.map(responder => {
//       return {
//         ...responder,
//         responsibility: responsibilityDecode[responder.responsibility],
//         regions: responder.regions.map(regionId => regionsDecode[regionId]),
//         yechida: responder.yechida.map(yechidaId => yechidaDecode[yechidaId]),
//         status: statusDecode[responder.status],
//       };
//     });

//     // Filter responders based on selected event type, unit, and region
//     const filteredResponders = responders.filter(responder => {
//       // Match by event type (responsibility)
//       const isEventTypeMatch = eventType
//         ? responder.responsibility === responsibilityDecode[parseInt(eventType)] // Convert eventType to integer
//         : true;

//       // Match by unit (yechida)
//       const isUnitMatch = yechidot ? responder.yechida.includes(parseInt(yechidot)) : true;

//       // Match by region
//       const isRegionMatch = region ? responder.regions.includes(parseInt(region)) : true;

//       return isEventTypeMatch && isUnitMatch && isRegionMatch;
//     });

//     console.log(filteredResponders);  // Log the filtered responders for debugging
//     // Update the state with the filtered responders
//     setSelectedResponders(filteredResponders);
//   };

//   return (
//     <div>
//       <h2>הגדרת מצב חירום</h2>

//       {/* Select Event Type */}
//       <div>
//         <label>בחר סוג אירוע:</label>
//         <select value={eventType} onChange={(e) => setEventType(e.target.value)}>
//           <option value="">בחר סוג אירוע</option>
//           {eventTypes.map(event => (
//             <option key={event.id} value={event.id}>{event.name}</option>
//           ))}
//         </select>
//       </div>

//       {/* Select yechidot */}
//       <div>
//         <label>בחר יחידה:</label>
//         <select value={yechidot} onChange={(e) => setyechidot(e.target.value)}>
//           <option value="">בחר יחידה</option>
//           {yechidots.map(yechidot => (
//             <option key={yechidot.id} value={yechidot.id}>{yechidot.name}</option>
//           ))}
//         </select>
//       </div>

//       {/* Select Region */}
//       <div>
//         <label>בחר מחוז:</label>
//         <select value={region} onChange={(e) => setRegion(e.target.value)}>
//           <option value="">בחר מחוז</option>
//           {regions.map(region => (
//             <option key={region.id} value={region.id}>{region.name}</option>
//           ))}
//         </select>
//       </div>

//       {/* Button to filter responders */}
//       <button onClick={filterResponders}>סנן כוננים</button>

//       {/* Display the filtered responders */}
//       <h3>רשימת כוננים רלוונטיים</h3>
//       <ul>
//         {selectedResponders.length > 0 ? (
//           selectedResponders.map(responder => (
//             <li key={responder.id}>
//               {responder.name} - 
//               {responder.responsibility} - 
//               {responder.regions.join(", ")} - 
//               {responder.yechida.join(", ")} - 
//               {responder.status}
//             </li>
//           ))
//         ) : (
//           <li>לא נמצאו כוננים רלוונטיים</li>
//         )}
//       </ul>
//     </div>
//   );
// }

// export default EmergencySetup;
