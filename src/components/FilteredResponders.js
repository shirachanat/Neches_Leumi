import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import MapWithRealTimeUpdates from './MapWithRealTimeUpdates';
import { responsibilityDecode, regionsDecode, yechidaDecode, statusDecode, whatsappTemplates, statuses, statusesDesc } from '../dec';
import './FilteredResponders.css'; // Custom CSS for RTL design
import { useConanimContext } from '../contexts/context';
//import PropTypes from "prop-types";
import ResponderItem from "./ResponderItem/ResponderItem";
import MessageStatus from "./MessagesStatus/MessageStatus";
import { sendTemplate } from '../api';
import { BarChart } from './Charts/Charts';


function FilteredResponders() {
  const location = useLocation();
  const { selectedYechida} = location.state || {};
  const { state } = useLocation();
  const navigate = useNavigate();
  const { filteredResponders, setFilteredResponders } = useConanimContext() // State for filtered responders
   // Function to fetch travel time
   const fetchTravelTime = async (origin, destination) => {
    try {
      const response = await fetch(
        `https://router.project-osrm.org/route/v1/driving/${origin};${destination}?overview=false`
      );
      const data = await response.json();

      if (data.code === "Ok") {
        const duration = data.routes[0].duration; // Duration in seconds
        return Math.round(duration / 60); // Convert to minutes
      } else {
        console.error("Failed to calculate travel time");
        return null;
      }
    } catch (error) {
      console.error("Error fetching travel time:", error.message);
      return null;
    }
  };

  // Calculate travel time for responders
  useEffect(() => {
    const updateTravelTimes = async () => {
      const updatedResponders = await Promise.all(
        filteredResponders.map(async (responder) => {
          // Skip responders that already have a travel time
          if (
            responder.latitude &&
            responder.longitude &&
            responder.estimatedTravelTime == null
          ) {
            const origin = `34.7818,32.0853`; // Replace with actual origin
            const destination = `${responder.longitude},${responder.latitude}`;
            const travelTime = await fetchTravelTime(origin, destination);
            return { ...responder, estimatedTravelTime: travelTime };
          }
          return responder; // No change if travel time already exists
        })
      );

      // Only update state if there's an actual change
      setFilteredResponders((prev) => {
        if (JSON.stringify(prev) !== JSON.stringify(updatedResponders)) {
          return updatedResponders;
        }
        return prev;
      });
    };

    if (filteredResponders.length > 0) {
      updateTravelTimes();
    }
  }, [filteredResponders, setFilteredResponders]);
  
  const arrivedButtunClicked = (responder) => {
    let senderIndex = filteredResponders.findIndex(conan => conan.id === responder.id)
    if (senderIndex !== -1) {
      let copy = [...filteredResponders]
      copy[senderIndex].arrived = true
      setFilteredResponders(copy)
    }
  }
  const chazlashHendler = () => {
    const phoneNumbers = filteredResponders.map((responder) => responder.phone);
    sendTemplate(phoneNumbers.filter((phone) => phone[0] == '9'), whatsappTemplates.chazlash, [])
      .then((response) => {
        if (response.ok) {
          console.log('chazlash sent successfully.');
        } else {
          console.log('שליחת חזלש נכשלה.');
        }
      })
      .catch((error) => {
        console.error('Error sending call request:', error);
        alert('אירעה שגיאה.');
      });
  }
 
// Helper function to create mock messages
const createMockMessage = (sender, latitude, longitude, status = 'active') => {
  return JSON.stringify({
    sender,
    body: `Test message body for ${sender}`, // Include sender in the body for clarity
    latitude,
    longitude,
    status,
  });
};

// Array of mock message configurations
const mockMessages = [
  { sender: '972584480345', latitude: 31.768319, longitude: 35.213737 },
  { sender: '972584480345', latitude: 31.896379, longitude: 34.949413 , delay: 3000},
  { sender: '972584480346', latitude: 31.543319, longitude: 35.387737 },
  { sender: '972584480346', latitude: 31.543319, longitude: 35.387737, delay: 7000 },
  { sender: '972505711183', latitude: 31.934634508465482, longitude: 34.8802014541373 },
  { sender: '972505711183', latitude: 31.934671, longitude: 34.879987, delay: 9000 }, 
  { sender: '972505711183', latitude: 31.934716, longitude: 34.879933, delay: 11000, status:5 }, // Delayed message
];

  useEffect(() => {
    const ws = new WebSocket('wss://neches-leumi-server.onrender.com');
    // console.log('filtered data'+filteredResponders)
    console.log("Filtered responders:", filteredResponders);
 // Simulate receiving messages with optional delays
mockMessages.forEach((msg, index) => {
  const delay = msg.delay || 1000; // Default delay of 1000ms
  setTimeout(() => {
    const mockMessage = createMockMessage(msg.sender, msg.latitude, msg.longitude, msg.status);
    ws.onmessage({ data: mockMessage });
  }, delay + index * 1000); // Stagger messages to simulate real-time updates
});
    // Log messages from the server
    ws.onmessage = (event) => {
      try {
        console.log(event.data);
        const data = JSON.parse(event.data)
        let senderIndex = filteredResponders.findIndex(conan => conan.phone === data.sender)
        if (senderIndex !== -1) {
          let copy = [...filteredResponders]
          if (data?.body) copy[senderIndex].body = data?.body
          if (data?.latitude) copy[senderIndex].latitude = data?.latitude
          if (data?.longitude) copy[senderIndex].longitude = data?.longitude
          if (data?.status) copy[senderIndex].messageStatus = statusesDesc[data?.status]
          setFilteredResponders(copy)
        }

      } catch (error) {
        console.error(error);

      }
    };
    // Send a message to the server
    // ws.onopen = () => ws.send('Hello from the client!');
    ws.onclose = (event) => console.log('Connection closed:', event.code, event.reason);
    return () => ws.close();
  }, [])
  return (
    <div className="filtered-responders-container" dir="rtl">
      {/* Map Section */}
      <div className="map-and-list-container">
        <div className="map-container">
          <MapWithRealTimeUpdates selectedYechida={selectedYechida} />
        </div>
  
        {/* Responder List Section */}
        <div className="responders-list-container">
          <button className="chazlash-button" onClick={chazlashHendler}>
            סיום אירוע
          </button>
          <BarChart filteredResponders={filteredResponders} />
  
          {filteredResponders.length > 0 ? (
            <ul className="responder-list">
              {filteredResponders.map((responder) => {
                // Calculate Estimated Arrival Time
                const estimatedArrivalTime =
                  responder.estimatedTravelTime !== null && responder.estimatedTravelTime > 0
                    ? (() => {
                        const currentTime = new Date();
                        currentTime.setMinutes(currentTime.getMinutes() + responder.estimatedTravelTime); // Add travel time
                        return currentTime.toLocaleTimeString('he-IL', { hour: '2-digit', minute: '2-digit' }); // Format as HH:mm
                      })()
                    : null;
  
                return (
                  <ResponderItem
                    key={responder.id}
                    responder={responder}
                    additionalContent={
                      <>
                        <MessageStatus status={responder.messageStatus} />
                        <div> {responder.name}</div>
                        {responder.estimatedTravelTime !== null && responder.estimatedTravelTime > 0 ? (
                          <div>זמן נסיעה משוער: {responder.estimatedTravelTime} דקות</div>
                        ) : (
                          <div>מחשב זמן נסיעה...</div>
                        )}
                        {responder.arrived ? (
                          <button onClick={() => {}} className="arrived-button" disabled>
                            הגיע
                          </button>
                        ) : responder.longitude && estimatedArrivalTime ? (
                          <div>שעת הגעה משוערת: {estimatedArrivalTime}</div>
                        ) : null}
                        {!responder.arrived && (
                          <button onClick={() => arrivedButtunClicked(responder)} className="arrived-button">
                            סימון הגעה
                          </button>
                        )}
                      </>
                    }
                  />
                );
              })}
            </ul>
          ) : (
            <div className="no-responders-message">
              <p>לא נמצאו כוננים מתאימים למצב חירום שנבחר</p>
              <button className="back-button" onClick={() => navigate('/')}>
                חזור לסינון
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// FilteredResponders.propTypes = {
//   responders: PropTypes.arrayOf(
//     PropTypes.shape({
//       id: PropTypes.number.isRequired,
//       name: PropTypes.string.isRequired,
//       phone: PropTypes.string.isRequired,
//       messageStatus: PropTypes.oneOf(["sent", "delivered", "read"]).isRequired,
//     })
//   ).isRequired,
// };
export default FilteredResponders;
