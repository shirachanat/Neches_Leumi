import React, { useEffect } from "react";
import './MobileHaznaka.css'
import { useConanimContext } from "../../contexts/context";
import { sendTemplate } from "../../api";
import { useNavigate } from 'react-router-dom';
import { whatsappTemplates } from "../../dec";
import { useMobileContext } from "../../contexts/MobileContext";
export const MobileHaznaka = () => {
    const {setHuzneku} = useMobileContext();
    const { filteredResponders, setFilteredResponders,conanim } = useConanimContext();
    const navigate = useNavigate();
    useEffect(() => {
        const results = conanim.filter((responder) => {
          const matchesResponsibility =  responder.responsibility == 1
        //   const matchesRegion =  responder.regions.some(region => region == 1)
          const matchesYechida = responder.yechida.some(responderYechida => responderYechida == 201)
          return matchesResponsibility &&  matchesYechida;
        });
        setFilteredResponders(results);
      }, [ conanim]);
    const handleConfirmCall = () => {
        setHuzneku(true);
        const phoneNumbers = filteredResponders.map((responder) => responder.phone);
    
        sendTemplate(phoneNumbers.filter((phone) => phone[0] == '9'), whatsappTemplates.emergency, [
          { type: "header", value: ['כלא איילון'] },
          { type: "body", value: ['כלא איילון אגף 6', "ארוע אלימות קשה, אסירים וסוהרים רבים פצועים"] }
        ])
          .then((response) => {
            if (response.ok) {
              navigate('/filtered-responders');
            } else {
              console.error('שליחת הקריאה נכשלה.');
            }
          })
          .catch((error) => {
            console.error('Error sending call request:', error);
          });
        //navigate('/filtered-responders');
        navigate('/filtered-responders', {
          state: {  filteredResponders },
        });
      };
    return(<div className="MobileHaznaka">
        <div className="transparent-haznaka-button" onClick={handleConfirmCall}></div>
        {/* <img src={`${process.env.PUBLIC_URL}/haznaka-button.svg`} alt="" /> */}
    </div>)
}