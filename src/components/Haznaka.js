import { responsibilityDecode, regionsDecode, yechidaDecode } from '../dec';
import emergencyConanim from '../conanim.json'; // טוען את נתוני הכוננים מקובץ JSON
import React, { useState } from 'react';
import './Haznaka.css'; // קובץ CSS מותאם אישית

function Haznaka() {
  const [selectedResponsibility, setSelectedResponsibility] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('');
  const [selectedYechida, setSelectedYechida] = useState('');
  const [filteredResponders, setFilteredResponders] = useState([]); // State for filtered responders
  const [isFiltered, setIsFiltered] = useState(false); // State to toggle between filter view and form view

  const filterResponders = () => {
    return emergencyConanim.filter((responder) => {
      const matchesResponsibility = selectedResponsibility ? responder.responsibility === parseInt(selectedResponsibility) : true;
      const matchesRegion = selectedRegion ? responder.regions.includes(parseInt(selectedRegion)) : true;
      const matchesYechida = selectedYechida ? responder.yechida.includes(parseInt(selectedYechida)) : true;
      return matchesResponsibility && matchesRegion && matchesYechida;
    });
  };

  const handleFilterClick = () => {
    //const filteredResponders = filterResponders();
     //navigate('/filtered-responders', { state: { responders: filteredResponders } }); // מעבר למסך הבא עם המידע
    const results = filterResponders();
    setFilteredResponders(results);
    setIsFiltered(true); // Switch to display filtered results
  };

  const handleConfirmCall = () => {
    const phoneNumbers = filteredResponders.map((responder) => responder.phone);
    console.log('Calling the following numbers:', phoneNumbers);

    // Example: Send to API (mocked as console.log here)
    // Replace this with an actual API call
    fetch('/api/call-responders', {
      // https://neches-leumi-server.onrender.com/sendMessage
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ phoneNumbers }),
    })
      .then((response) => {
        if (response.ok) {
          alert('Call request sent successfully!');
        } else {
          alert('Failed to send call request.');
        }
      })
      .catch((error) => {
        console.error('Error sending call request:', error);
        alert('An error occurred.');
      });
  };

  return (
    <div className="haznaka-container">
      <h1 className="haznaka-title">סינון כונני חירום</h1>

      {!isFiltered ? (
        <>
          <div className="form-group">
            <label htmlFor="responsibility" className="form-label">סוג אירוע:</label>
            <select
              id="responsibility"
              className="form-select"
              onChange={(e) => setSelectedResponsibility(e.target.value)}
              value={selectedResponsibility}
            >
              <option value="">בחר אירוע</option>
              {Object.entries(responsibilityDecode).map(([key, value]) => (
                <option key={key} value={key}>
                  {value}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="region" className="form-label">אזור:</label>
            <select
              id="region"
              className="form-select"
              onChange={(e) => setSelectedRegion(e.target.value)}
              value={selectedRegion}
            >
              <option value="">בחר אזור</option>
              {Object.entries(regionsDecode).map(([key, value]) => (
                <option key={key} value={key}>
                  {value}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="yechida" className="form-label">יחידה:</label>
            <select
              id="yechida"
              className="form-select"
              onChange={(e) => setSelectedYechida(e.target.value)}
              value={selectedYechida}
            >
              <option value="">בחר יחידה</option>
              {Object.entries(yechidaDecode).map(([key, value]) => (
                <option key={key} value={key}>
                  {value}
                </option>
              ))}
            </select>
          </div>

          <button className="filter-button" onClick={handleFilterClick}>
            סנן
          </button>
        </>
      ) : (
        <div>
          <h2>כוננים מתאימים למצב חירום</h2>
          {filteredResponders.length > 0 ? (
            <ul className="responder-list">
              {filteredResponders.map((responder) => (
                <li key={responder.id} className="responder-item">
                  <p><strong>{responder.name}</strong></p>
                  <p>טלפון: {responder.phone}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p>לא נמצאו כוננים מתאימים למצב חירום שנבחר</p>
          )}
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
            <button className="filter-button" onClick={() => setIsFiltered(false)}>
              חזרה לסינון
            </button>
            <button className="filter-button" onClick={handleConfirmCall}>
              אישור קריאה לכל הכוננים
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Haznaka;
