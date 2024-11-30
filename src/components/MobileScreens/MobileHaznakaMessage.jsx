import React, { useEffect } from "react";

export const MobileHaznakaMessage = ({ setBackgroundImage, setAppStarted }) => {
    useEffect(() => {
        setBackgroundImage(`url('${process.env.PUBLIC_URL}/haznaka-message.png')`);
    }, [])
    return (<div style={{position:'absolute', width:'100%', height:'100%', cursor:'pointer'}} onClick={() => setAppStarted(true)}>

    </div>)
}