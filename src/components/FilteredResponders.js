import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import MapWithRealTimeUpdates from './MapWithRealTimeUpdates';
import { responsibilityDecode, regionsDecode, yechidaDecode, statusDecode } from '../dec';
import './FilteredResponders.css'; // Custom CSS for RTL design
import { useConanimContext } from '../contexts/context';
//import PropTypes from "prop-types";
import ResponderItem from "./ResponderItem/ResponderItem";
import MessageStatus from "./MessagesStatus/MessageStatus";

function FilteredResponders() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { filteredResponders, setFilteredResponders } = useConanimContext() // State for filtered responders
  const arrivedButtunClicked = (responder) => {
    let senderIndex = filteredResponders.findIndex(conan => conan.id === responder.id)
    if (senderIndex !== -1) {
      let copy = [...filteredResponders]
      copy[senderIndex].arrived = true
      setFilteredResponders(copy)
    }
  }
  useEffect(() => {
    const ws = new WebSocket('wss://neches-leumi-server.onrender.com');
    // console.log('filtered data'+filteredResponders)
    console.log("Filtered responders:", filteredResponders);

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
          if (data?.status) copy[senderIndex].messageStatus = data?.status
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
     
      <div className="content-wrapper">
        {/* Map Section */}
        <div className="map-container">
          <MapWithRealTimeUpdates />
        </div>

        {/* Responder List Section */}
        <div className="responders-list-container">
          {filteredResponders.length > 0 ? (
            <ul className="responder-list">
              {filteredResponders.map((responder) => (
                <ResponderItem
                  key={responder.id}
                  responder={responder}
                  additionalContent={
                    <>
                      <MessageStatus status={responder.messageStatus} />
                      {responder.arrived ? <button onClick={() => { }} className="arrived-button" disabled >הגיע</button>
                       : responder.longitude && <div> שעת הגעה משוערת: 16:30</div>}
                      {!responder.arrived && <button onClick={() => { arrivedButtunClicked(responder)}} className="arrived-button" >סימון הגעה</button>}
                      {/* <p className="centered-role"> {responsibilityDecode[responder.responsibility]}</p> */}

                    </>
                  }
                />
              ))}
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
