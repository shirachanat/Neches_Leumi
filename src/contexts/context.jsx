import React, { createContext, useState, useEffect, useContext } from 'react';
import emergencyConanim from '../conanim.json'; // טוען את נתוני הכוננים מקובץ JSON

const ConanimContext = createContext();

export const ConanimProvider = ({ children }) => {
    const [conanim, setConanim] = useState([]);
    const [filteredResponders, setFilteredResponders] = useState([]);
    const [recivedMessage, setRecivedMessage] = useState([]);
    useEffect(() => {
        setConanim(emergencyConanim);
    }, []);

    return (
        <ConanimContext.Provider value={{ conanim, setConanim, filteredResponders, setFilteredResponders, recivedMessage, setRecivedMessage, }}>
            {children}
        </ConanimContext.Provider>
    );
};

export const useConanimContext = () => useContext(ConanimContext);
