import React from "react";
import PropTypes from "prop-types";
import { responsibilityDecode, yechidaDecode } from "../../dec";

const ResponderItem = ({ responder, onDelete, additionalContent }) => {
  return (
    <li className="responder-item">
      <div className="responder-details">
        <p>
        <a href={responder.img} target="_blank" rel="noopener noreferrer" style={{width: '100%', height: '100%'}}>
        <img src={responder.img} alt="icon" 
        style={{ width: '30px', height: '30px',
          borderRadius: '50%', // הופך את התמונה לעיגול
            objectFit: 'cover', // שומר על פרופורציות התמונה וממלא את העיגול
            border: '1px solid #ccc',}}/> 
      </a>
          <strong> <span style={{fontSize: "1.2rem"}}>{responder.name}</span> - {responder.yechida.map(yechida => yechidaDecode[yechida]).join(", ")}</strong>
        </p>
        <p>{responsibilityDecode[responder.responsibility]}</p>
        <p> {responder.name}</p>
      </div>
      {additionalContent && <div className="additional-content">{additionalContent}</div>}
      {onDelete && (
        <button
          className="delete-button"
          onClick={() => onDelete(responder.id)}
        >
          ❌
        </button>
      )}
    </li>
  );
};

ResponderItem.propTypes = {
  responder: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    phone: PropTypes.string.isRequired,
  }).isRequired,
  onDelete: PropTypes.func, // Optional, for cases where deleting isn't needed
  additionalContent: PropTypes.element, // Optional, for additional child components
};

export default ResponderItem;
