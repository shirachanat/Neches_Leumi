import React, { createContext, useContext, useState } from "react";

const MobileContext = createContext();

export const MobileProvider = ({ children }) => {
    const [huzneku, setHuzneku] = useState(false);
    const [appStarted, setAppStarted] = useState(false);
    const [iconIphoneClicked, setIconIphoneClicked] = useState(false);
    return (
        <MobileContext.Provider value={{ huzneku, setHuzneku, appStarted, setAppStarted,iconIphoneClicked, setIconIphoneClicked }}>
            {children}
        </MobileContext.Provider>
    );
};

export const useMobileContext = () => useContext(MobileContext);