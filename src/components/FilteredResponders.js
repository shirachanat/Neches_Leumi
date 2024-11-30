import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import MapWithRealTimeUpdates from './MapWithRealTimeUpdates';
import { statusesDesc, whatsappTemplates } from '../dec';
import './FilteredResponders.css'; // Custom CSS for RTL design
import { useConanimContext } from '../contexts/context';
import ResponderItem from "./ResponderItem/ResponderItem";
import MessageStatus from "./MessagesStatus/MessageStatus";
import { sendTemplate } from '../api';
import { BarChart, filterMessageStatus } from './Charts/Charts';
import { Input } from './Input/Input';
import './FilteredResponders.css';

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
          if (responder.latitude && responder.longitude && !responder.estimatedTravelTime) {
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
      prev.map((responder) => {
        if (responder.estimatedTravelTime && responder.estimatedTravelTime > 0) {
          // Reduce time randomly between 1 and 5 minutes
          const reduction = Math.min(
            Math.floor(Math.random() * 5) + 1, // Random reduction
            responder.estimatedTravelTime // Ensure it doesn't go below zero
          );
          return {
            ...responder,
            estimatedTravelTime: responder.estimatedTravelTime - reduction,
          };
        }
        return responder; // If no time is set or time is already zero
      })
    );
  }, 2000); // Update every 2 seconds

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
        //alert('אירעה שגיאה.');
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
  { sender: '0584480345', latitude: 31.9335, longitude: 34.8735 },
  { sender: '0584480345', latitude: 31.9340, longitude: 34.8740, delay: 3000 },
  //{ sender: '0584480346', latitude: 31.9328, longitude: 34.8732 },
  { sender: '0584480346', latitude: 31.9332, longitude: 34.8738, delay: 7000 },
  //{ sender: '0505711183', latitude: 31.9342, longitude: 34.8739 },
  { sender: '0505711183', latitude: 31.9336, longitude: 34.8742, delay: 9000 },
 // { sender: '0505711183', latitude: 31.9339, longitude: 34.8744, delay: 11000, status: 5 },
  { sender: '0586529546', latitude: 31.9337, longitude: 34.8741, delay: 5000, status: 5 },
  { sender: '0501234567', latitude: 31.9338, longitude: 34.8736, delay: 11000, status: 5 },
  { sender: '0521234567', latitude: 31.9341, longitude: 34.8743 , delay: 13000},
  { sender: '0531234567', latitude: 31.9333, longitude: 34.8737 , delay: 15000},
  { sender: '0541234567', latitude: 31.9345, longitude: 34.8739 , delay: 17000},
  { sender: '0551234567', latitude: 31.9329, longitude: 34.8731 , delay: 19000},
  { sender: '0561234567', latitude: 31.9334, longitude: 34.8740 , delay: 21000},
  { sender: '0571234567', latitude: 31.9340, longitude: 34.8738 },
  { sender: '0581234567', latitude: 31.9336, longitude: 34.8734 },
  { sender: '0591234567', latitude: 31.9343, longitude: 34.8736 },
  { sender: '0502345678', latitude: 31.9335, longitude: 34.8742 },
  { sender: '0522345678', latitude: 31.9338, longitude: 34.8733 },
  { sender: '0532345678', latitude: 31.9332, longitude: 34.8739, delay: 6000 },
  { sender: '0542345678', latitude: 31.9339, longitude: 34.8737 },
  { sender: '0552345678', latitude: 31.9337, longitude: 34.8740 },
  { sender: '0562345678', latitude: 31.9341, longitude: 34.8745 },
  { sender: '0572345678', latitude: 31.9327, longitude: 34.8738 },
  { sender: '0582345678', latitude: 31.9333, longitude: 34.8744 },
  { sender: '0592345678', latitude: 31.9339, longitude: 34.8735, delay: 8000 },
  { sender: '0503456789', latitude: 31.9334, longitude: 34.8732 },
  { sender: '0523456789', latitude: 31.9335, longitude: 34.8736 },
  { sender: '0533456789', latitude: 31.9343, longitude: 34.8738 },
  { sender: '0543456789', latitude: 31.9329, longitude: 34.8735 },
  { sender: '0553456789', latitude: 31.9341, longitude: 34.8741 },
  { sender: '0563456789', latitude: 31.9337, longitude: 34.8743 },
  { sender: '0573456789', latitude: 31.9336, longitude: 34.8739 },
  { sender: '0583456789', latitude: 31.9338, longitude: 34.8737, delay: 4000 },
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
        const data = JSON.parse(event.data);
        let senderIndex = filteredResponders.findIndex(conan => conan.phone === data.sender);
        if (senderIndex !== -1) {
          let copy = [...filteredResponders];
          if (data?.body) copy[senderIndex].body = data?.body;
          if (data?.latitude) copy[senderIndex].latitude = data?.latitude;
          if (data?.longitude) copy[senderIndex].longitude = data?.longitude;
          if (data?.status) copy[senderIndex].messageStatus = statusesDesc[data?.status];
          setFilteredResponders(copy);
        }
      } catch (error) {
        console.error(error);
      }
    };
    ws.onclose = (event) => console.log('Connection closed:', event.code, event.reason);
    return () => ws.close();
  }, [])

  const [filterValue, setFilterValue] = useState({ text: '', status: '' })
  const veryfiltered = !filterValue.status && !filterValue.text ? filteredResponders :
    filteredResponders.filter((responder) => {
      const filterWords = filterValue.text.split(' ');
      return filterWords.every((word) => [responder.phone, responder.name, responder.id].some((str) => str.includes(word)))
        && (filterValue.status === '' || filterMessageStatus(filterValue.status, responder))
    })
  return (
    <div className="filtered-responders-container" dir="rtl">
      <div className="map-and-list-container">
        <div className="map-container">
          <MapWithRealTimeUpdates selectedYechida={selectedYechida} />
        </div>

        <div className="left-side-container">
          <div className='chart-container'>
            <button className="chazlash-button" onClick={chazlashHandler}>
              סיום אירוע
            </button>
            <BarChart filteredResponders={filteredResponders} setFilterValue={setFilterValue} />

          </div>
          <div className='responders-list-container'>
          <Input onChange={e => setFilterValue(prev => ({ ...prev, text: e.target.value }))} onClean={() => setFilterValue(prev => ({ ...prev, text: '' }))} value={filterValue.text} />
          {filteredResponders.length > 0 ? (
            <ul className="responder-list">
              {veryfiltered.map((responder) => {
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
                          <button onClick={() => { }} className="arrived-button" disabled>
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
              <button className="back-button" onClick={() => navigate('/')}>חזור לסינון</button>
            </div>
          )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default FilteredResponders;
