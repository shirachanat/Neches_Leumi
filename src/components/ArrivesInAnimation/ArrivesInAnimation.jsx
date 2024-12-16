import React from "react";
import './ArrivesInAnimation.css'
import { statuses, statusesDesc } from "../../dec";
export const ArrivesInAnimation = () => {
    const color = statuses.find((status) => status.codeStatus === statusesDesc.onWay).color
    return (
        <div className="arrival-animation" >
            <span className="pulse" style={{ backgroundColor: color }}></span>
        </div>
    )
}