import React, { useEffect } from "react";
import { useMobileContext } from "../../contexts/MobileContext";

export const MobileHaznakaMessage = ({ setBackgroundImage }) => {
    const {setAppStarted} = useMobileContext();
    useEffect(() => {
        setBackgroundImage(`url('${process.env.PUBLIC_URL}/haznaka-message.png')`);
    }, [])
    return (<div style={{position:'absolute', width:'100%', height:'100%', cursor:'pointer'}} onClick={() => setAppStarted(true)}>

    </div>)
}