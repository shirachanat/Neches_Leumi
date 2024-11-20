import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import MapWithRealTimeUpdates from './MapWithRealTimeUpdates';
import { responsibilityDecode, regionsDecode, yechidaDecode, statusDecode } from '../dec';
import './FilteredResponders.css'; // Custom CSS for RTL design

function FilteredResponders() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const responders = state?.responders || [];

  return (
    <div className="filtered-responders-container" dir="rtl">
      <h1 className="page-title">כוננים מתאימים למצב חירום</h1>

      <div className="content-wrapper">
        {/* Map Section */}
        <div className="map-container">
          <MapWithRealTimeUpdates responders={responders} />
        </div>

        {/* Responder List Section */}
        <div className="responders-list-container">
          {responders.length > 0 ? (
            <ul className="responders-list">
              {responders.map((responder) => (
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
              <button className="back-button" onClick={() => navigate('/haznaka')}>
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
