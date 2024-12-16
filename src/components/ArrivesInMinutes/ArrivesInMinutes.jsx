import React, { useEffect, useState } from "react";
import { ArrivesInAnimation } from "../ArrivesInAnimation/ArrivesInAnimation";
import './ArrivesInMinutes.css';
import { useConanimContext } from "../../contexts/context";


export const ArrivesInMinutes = ({ minutes, responder }) => {
    const [timeRemaining, setTimeRemaining] = useState(minutes);
    const { filteredResponders, setFilteredResponders } = useConanimContext();
    // const setStatusArrived = () => {
    //     const senderIndex = filteredResponders.findIndex((conan) => conan.id === responder.id);
    //     if (senderIndex !== -1) {
    //         const copy = [...filteredResponders];
    //         copy[senderIndex].arrived = true;
    //         setFilteredResponders(copy);
    //     }
    // }
    useEffect(() => {
        const interval = setInterval(() => {
            setTimeRemaining((prev) => prev - 1);
            if (timeRemaining === 0) {
                clearInterval(interval);
            }
        }, 1000 * 60);

        return () => { if (interval) clearInterval(interval) };
    }, [])
    return (
        <div className="arrives-in-minutes">
            <ArrivesInAnimation />
            <span>
                <span className="minutes-number">{timeRemaining}</span>
                <span className="minutes-label">דקות</span>
            </span>
        </div>
    );
};
