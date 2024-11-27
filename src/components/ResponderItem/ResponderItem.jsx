import React from "react";
import PropTypes from "prop-types";
import { responsibilityDecode, yechidaDecodeArray } from "../../dec";

const ResponderItem = ({ responder, onDelete, additionalContent }) => {
  return (
    <li className="responder-item">
      <div className="responder-details">
        <p>
          {/* <strong> <span style={{fontSize: "1.2rem"}}>{responder.name}</span> - {responder.yechida.map(yechida => yechidaDecodeArray[yechida]).join(", ")}</strong> */}
        </p>
        <p>{responsibilityDecode[responder.responsibility]}</p>
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
