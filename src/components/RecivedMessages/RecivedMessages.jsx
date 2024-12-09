import React, { useEffect } from "react";
import ReceivedMessage from "../RecivedMessage/RecivedMessage";
import { useConanimContext } from "../../contexts/context";
import './RecivedMessages.css'
export const RecivedMessages = () => {
    const { recivedMessage } = useConanimContext();
    return (
        <div className="recieved-messages-container">{
            recivedMessage.toReversed().map((msg, index) => <ReceivedMessage message={msg.message} timestamp={msg.time} sender={msg.sender} key={index} />)
        }</div>
    )
}