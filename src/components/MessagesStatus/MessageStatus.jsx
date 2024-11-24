import React from "react";
import PropTypes from "prop-types";
import "./MessageStatus.css"; // For styling (CSS included below)

/**
 * MessageStatus Component
 * @param {string} status - The message status ('sent', 'delivered', 'read')
 * @returns JSX Element
 */
const MessageStatus = ({ status="Sent" }) => {
  const getStatusIcon = () => {
    switch (status) {
      case "Sent":
        return <i className="icon-single-check"></i>; // Single check
      case "Delivered":
        return (
          <i className="icon-double-check delivered"></i> // Double gray checks
        );
      case "Read":
        return <i className="icon-double-check read"></i>; // Double blue checks
      default:
        return null; // No icon for unknown status
    }
  };

  return <div className="message-status">{getStatusIcon()}</div>;
};

MessageStatus.propTypes = {
  status: PropTypes.oneOf(["sent", "delivered", "read"]).isRequired,
};

export default MessageStatus;
