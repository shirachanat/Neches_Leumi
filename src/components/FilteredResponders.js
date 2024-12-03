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
