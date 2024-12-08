import React from "react";
import { statuses, statusesDesc, yechidaDecode } from "../../dec";
import messageIcon from '../../assetst/comment-dots.svg'
import phoneIcon from '../../assetst/phone-call.svg'
import locationIcon from '../../assetst/land-layer-location.svg'
import './ResponderItemNew.css'
import MessageStatus from "../MessagesStatus/MessageStatus";
import { Chip } from "../Chip/Chip";
export const ResponderItemNew = ({ responder }) => {
    const status = statusByResponder(responder);
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
            <div className="icons-area">

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
            <div className="flex-align-end">
                <Chip label={status.label} style={{ backgroundColor: status.color , color: status.fontColor}} />
                <MessageStatus status={responder.messageStatus} />
            </div>
        </div>

    </div>)
}

const statusByResponder =(responder)=>{
    if (responder.arrived) return statuses.find((status) => status.codeStatus === statusesDesc.arrived)
    if (responder.latitude) return statuses.find((status) => status.codeStatus === statusesDesc.onWay)
    return statuses.find((status) => status.codeStatus === responder.messageStatus)
}