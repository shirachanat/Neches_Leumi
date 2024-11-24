import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import MapWithRealTimeUpdates from './MapWithRealTimeUpdates';
import { responsibilityDecode, regionsDecode, yechidaDecode, statusDecode } from '../dec';
import './FilteredResponders.css'; // Custom CSS for RTL design
import { useConanimContext } from '../contexts/context';

function FilteredResponders() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { filteredResponders, setFilteredResponders } = useConanimContext() // State for filtered responders
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
      <h1 className="page-title">כוננים מתאימים למצב חירום</h1>

      <div className="content-wrapper">
        {/* Map Section */}
        <div className="map-container">
          <MapWithRealTimeUpdates/>
        </div>

        {/* Responder List Section */}
        <div className="responders-list-container">
          {filteredResponders.length > 0 ? (
            <ul className="responders-list">
              {filteredResponders.map((responder) => (
                <li key={responder.id} className="responder-card">
                  <h3>{responder.name}</h3>
                  <p><strong>תפקיד:</strong> {responsibilityDecode[responder.responsibility]}</p>
                  <p><strong>אזור:</strong> {responder.regions.map((region) => regionsDecode[region]).join(', ')}</p>
                  <p><strong>יחידה:</strong> {responder.yechida.map((yechida) => yechidaDecode[yechida]).join(', ')}</p>
                  <p><strong>סטטוס:</strong> {statusDecode[responder.status]}</p>
                </li>
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

export default FilteredResponders;
