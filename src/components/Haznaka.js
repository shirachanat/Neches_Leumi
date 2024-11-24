import { responsibilityDecode, regionsDecode, yechidaDecode, agafDecode, whatsappTemplates } from '../dec';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Haznaka.css'; // קובץ CSS מותאם אישית
import { useConanimContext } from '../contexts/context';
import { sendTemplate } from '../api';

function Haznaka() {
  const { conanim } = useConanimContext();
  const [selectedResponsibility, setSelectedResponsibility] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('');
  const [selectedYechida, setSelectedYechida] = useState('');
  const [selectedAgaf, setSelectedAgaf] = useState('');
  const [filteredResponders, setFilteredResponders] = useState(conanim); // רשימת כוננים מסוננים
  const navigate = useNavigate();

  // עדכון הרשימה המסוננת באופן דינמי
  useEffect(() => {
    const results = conanim.filter((responder) => {
      const matchesResponsibility = selectedResponsibility
        ? responder.responsibility === parseInt(selectedResponsibility)
        : true;
      const matchesRegion = selectedRegion
        ? responder.regions.includes(parseInt(selectedRegion))
        : true;
      const matchesYechida = selectedYechida
        ? responder.yechida.includes(parseInt(selectedYechida))
        : true;
      return matchesResponsibility && matchesRegion && matchesYechida;
    });
    setFilteredResponders(results);
  }, [selectedResponsibility, selectedRegion, selectedYechida, conanim]);

  const manageConanimClicked = () => {
    navigate('/conanim');
  };

  const handleConfirmCall = () => {
    const phoneNumbers = filteredResponders.map((responder) => responder.phone);
    console.log('Calling the following numbers:', phoneNumbers);
    const mikum = `מחוז: ${regionsDecode[parseInt(selectedRegion)]} ${yechidaDecode && `, יחידה: ${yechidaDecode[parseInt(selectedYechida)]}`} ${phoneNumbers.length &&`, אגף: ${phoneNumbers.length}`}`
    sendTemplate(phoneNumbers.filter((phone) => phone[0] == '9'), whatsappTemplates.emergency, [{ type: "header", value: [mikum] }, { type: "body", value: [mikum, "בלגן לא נורמלי בכלא, אנשים זורקים כסאות על הדבופס"] }])
      .then((response) => {
        if (response.ok) {
          navigate('/filtered-responders');
          // alert('קריאה נשלחה בהצלחה!');
        } else {
          alert('שליחת הקריאה נכשלה.');
        }
      })
      .catch((error) => {
        console.error('Error sending call request:', error);
        alert('אירעה שגיאה.');
      });
  };

  const handleViewDashboard = () => {
    navigate('/filtered-responders');
  };

  return (
    <div className="haznaka-container">
      <h1 className="haznaka-title">סינון כונני חירום</h1>

      <div className="haznaka-content">
        {/* פקדי סינון בצד שמאל */}
        <div className="haznaka-filters">
          <div className="form-group">
            <label htmlFor="responsibility" className="form-label">סוג אירוע:</label>
            <select
              id="responsibility"
              className="form-select"
              onChange={(e) => setSelectedResponsibility(e.target.value)}
              value={selectedResponsibility}
            >
              <option value="">בחר מצב חירום</option>
              {Object.entries(responsibilityDecode).map(([key, value]) => (
                <option key={key} value={key}>
                  {value}
                </option>
              ))}
            </select>
          </div>

          <div >
            <label htmlFor="region" className="form-label">מיקום:</label>
            <div className="form-group-mikum">
              <select
                id="region"
                className="form-select"
                onChange={(e) => setSelectedRegion(e.target.value)}
                value={selectedRegion}
              >
                <option value="">בחר מחוז</option>
                {Object.entries(regionsDecode).map(([key, value]) => (
                  <option key={key} value={key}>
                    {value}
                  </option>
                ))}
              </select>
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
              <select
                id="agaf"
                className="form-select"
                onChange={(e) => setSelectedAgaf(e.target.value)}
                value={selectedAgaf}
              >
                <option value="">בחר אגף</option>
                {Object.entries(agafDecode).map(([key, value]) => (
                  <option key={key} value={key}>
                    {value}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <button className="filter-button" onClick={manageConanimClicked}>
            ניהול כוננים
          </button>
        </div>

        {/* רשימת כוננים בצד ימין */}
        <div className="haznaka-responders">
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
          <button className="filter-button" onClick={handleConfirmCall}>
            אישור קריאה לכל הכוננים
          </button>
          <button className="filter-button" onClick={handleViewDashboard}>
            מעבר ללוח בקרה להצגת כל הכוננים
          </button>
        </div>
      </div>
    </div>
  );
}

export default Haznaka;
