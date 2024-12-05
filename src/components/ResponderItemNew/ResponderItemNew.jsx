import React from "react";
import { yechidaDecode } from "../../dec";
import messageIcon from '../../assetst/comment-dots.svg'
import phoneIcon from '../../assetst/phone-call.svg'
import locationIcon from '../../assetst/land-layer-location.svg'
import './ResponderItemNew.css'
export const ResponderItemNew = ({ responder }) => {
    return (<div className="responder-item-container">
        <div className="responder-details-area">
            <img src={responder.img} className="avatar" alt="icon" />
            <div >
                <div className="responder-name">{responder.name}</div>
                <div className="responder-yechida">
                    {yechidaDecode[responder.yechida[0]]}
                </div>
            </div>
        </div>
        <div>
            <button className="responder-icon-button">
                <img src={messageIcon} className="responder-icons" alt="icon" />
            </button>
            <button className="responder-icon-button">
                <img src={phoneIcon} className="responder-icons" alt="icon" />
            </button>
            <button className="responder-icon-button">
                <img src={locationIcon} className="responder-icons" alt="icon" />
            </button>
        </div>

    </div>)
}