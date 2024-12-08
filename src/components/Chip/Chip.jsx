import React from "react";
import './Chip.css'
export const Chip = ({ label, style ,onClick=()=>{}}) => {
    return <div style={style} className="chip" onClick={onClick}>{label}</div>;
}