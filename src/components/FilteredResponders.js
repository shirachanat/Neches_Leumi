import React, { useEffect, useState } from 'react';
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
  const[filterValue, setFilterValue] = useState('')
  const veryfiltered = !filterValue? filteredResponders :
  filteredResponders.filter((responder) => {
    console.log('filterValueeeeeeeeeeee = ' +filterValue)
    const filterWords = filterValue.split(' ')
    return filterWords.every((word) => [responder.phone, responder.name, responder.id].some((str) => str.includes(word)))
  })

  return (
    <div className="filtered-responders-container" dir="rtl">
        {/* Map Section */}
       <div className="map-and-list-container">
        <div className="map-container">
          <MapWithRealTimeUpdates />
        </div>

        {/* Responder List Section */}
        <div className="responders-list-container">
          <button className='chazlash-button' onClick={chazlashHendler}>סיום אירוע</button>
        <BarChart filteredResponders={filteredResponders}/>
<input type="text" placeholder="חיפוש כוננים" className="search-input" onChange={e=>setFilterValue(e.target.value)} />
          {filteredResponders.length > 0 ? (
            <ul className="responder-list">
              {veryfiltered.map((responder) => (
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
