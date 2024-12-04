import React from "react";
import { yechidaDecode } from "../../dec";
import './ResponderItemNew.css'
export const ResponderItemNew = ({ responder }) => {
    return (<div className="responder-item-container">
        <img src={responder.img} className="avatar" alt="icon" />
        <div>
            <div className="responder-name">{responder.name}</div>
            <div className="responder-yechida">
                {responder.yechida.map(yechida => yechidaDecode[yechida]).join(", ")}
            </div>
        </div>
    </div>)
}