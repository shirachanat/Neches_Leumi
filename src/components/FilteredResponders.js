import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import MapWithRealTimeUpdates from './MapWithRealTimeUpdates';
import { statusesDesc, whatsappTemplates } from '../dec';
import './FilteredResponders.css'; // Custom CSS for RTL design
import { useConanimContext } from '../contexts/context';
import ResponderItem from "./ResponderItem/ResponderItem";
import MessageStatus from "./MessagesStatus/MessageStatus";
import { sendTemplate } from '../api';
import { BarChart } from './Charts/Charts';

function FilteredResponders() {
  const location = useLocation();
  const { selectedYechida } = location.state || {};
  const { state } = useLocation();
  const navigate = useNavigate();
  const { filteredResponders, setFilteredResponders } = useConanimContext(); // State for filtered responders

  // Simulate fetching travel time
  const fetchTravelTime = async (origin, destination) => {
    // Generate a random travel time between 1 and 30 minutes
    return Math.floor(Math.random() * 30) + 1;
  };

  // Calculate travel time for responders
  useEffect(() => {
    const updateTravelTimes = async () => {
      const updatedResponders = await Promise.all(
        filteredResponders.map(async (responder) => {
          if (
            responder.latitude &&
            responder.longitude &&
            responder.estimatedTravelTime == null
          ) {
            const travelTime = await fetchTravelTime(); // Simulated travel time
            return { ...responder, estimatedTravelTime: travelTime };
          }
          return responder; // No change if travel time already exists
        })
      );

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

  // Periodically update travel times
  useEffect(() => {
    const intervalId = setInterval(() => {
      setFilteredResponders((prev) =>
        prev.map((responder) => ({
          ...responder,
          estimatedTravelTime: Math.floor(Math.random() * 30) + 1, // Random time between 1-30 minutes
        }))
      );
    }, 5000); // Update every 5 seconds

    return () => clearInterval(intervalId); // Cleanup on unmount
  }, [setFilteredResponders]);

  const arrivedButtonClicked = (responder) => {
    const senderIndex = filteredResponders.findIndex((conan) => conan.id === responder.id);
    if (senderIndex !== -1) {
      const copy = [...filteredResponders];
      copy[senderIndex].arrived = true;
      setFilteredResponders(copy);
    }
  };

  const chazlashHandler = () => {
    const phoneNumbers = filteredResponders.map((responder) => responder.phone);
    sendTemplate(phoneNumbers.filter((phone) => phone[0] === '9'), whatsappTemplates.chazlash, [])
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
  };

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
      <div className="map-and-list-container">
        <div className="map-container">
          <MapWithRealTimeUpdates selectedYechida={selectedYechida} />
        </div>

        <div className="responders-list-container">
          <button className="chazlash-button" onClick={chazlashHandler}>
            סיום אירוע
          </button>
          <BarChart filteredResponders={filteredResponders} />

          {filteredResponders.length > 0 ? (
            <ul className="responder-list">
             {filteredResponders.map((responder) => {
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

          {/* Show Estimated Travel Time if not arrived */}
          {!responder.arrived && responder.estimatedTravelTime !== null && responder.estimatedTravelTime > 0 ? (
            <div>זמן נסיעה משוער: {responder.estimatedTravelTime} דקות</div>
          ) : !responder.arrived ? (
            <div>מחשב זמן נסיעה...</div>
          ) : null}

          {/* Show Estimated Arrival Time if not arrived */}
          {!responder.arrived && responder.longitude && estimatedArrivalTime ? (
            <div>שעת הגעה משוערת: {estimatedArrivalTime}</div>
          ) : null}

          {/* Arrived Button Logic */}
          {responder.arrived ? (
            <button onClick={() => {}} className="arrived-button" disabled>
              הגיע
            </button>
          ) : (
            <button onClick={() => arrivedButtonClicked(responder)} className="arrived-button">
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

export default FilteredResponders;
