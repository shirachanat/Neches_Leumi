import React from "react";
import PropTypes from "prop-types";
import "./MessageStatus.css"; // For styling (CSS included below)
import { statusesDesc } from "../../dec";

/**
 * MessageStatus Component
 * @param {string} status - The message status ('sent', 'delivered', 'read')
 * @returns JSX Element
 */
const MessageStatus = ({ status=statusesDesc.sent }) => {
  const getStatusIcon = () => {
    switch (status) {
      case statusesDesc.sent:
        return <i className="icon-single-check"></i>; // Single check
      case statusesDesc.delivered:
        return (
          <i className="icon-double-check delivered"></i> // Double gray checks
        );
      case statusesDesc.read:
        return <i className="icon-double-check read"></i>; // Double blue checks
      default:
        return null; // No icon for unknown status
    }
  };

  return <div className="message-status">{getStatusIcon()}</div>;
};

MessageStatus.propTypes = {
  status: PropTypes.oneOf([statusesDesc.sent, statusesDesc.delivered, statusesDesc.read]).isRequired,
};

export default MessageStatus;
