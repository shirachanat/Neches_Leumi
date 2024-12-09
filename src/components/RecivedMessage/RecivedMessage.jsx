import React from 'react';
import './RecivedMessage.css';
import { useConanimContext } from '../../contexts/context';
function ReceivedMessage({ message, timestamp, sender }) {
    const { filteredResponders } = useConanimContext();

    const senderName = filteredResponders.find((conan) => conan.phone === sender)?.name || 'Unknown';
    return (
        <div className="message-bubble">
            <div className="message-content-container">
                <div className="message-sender">{senderName}</div>
                <div className="message-content">{message}</div>
            </div>
            <div className="message-timestamp">{timestamp}</div>
        </div>
    );
};

export default ReceivedMessage;