import React, { useState } from "react";
import './Filters.css'
import { statuses } from "../../dec";
export const Filters = ({ setFilterValue}) => {
    const chipsList = [...statuses, { label: 'כולם', color: '#3F3323' }];
    const [selectedChip, setSelectedChip] = useState(1);
    const clickHandler = (status, index) => { 
        setSelectedChip(index) 
        setFilterValue(prev => ({ ...prev, status: prev.status === status ? '' : status }));
    }
    return <div className="chips-container">
        {chipsList.map((status, index) =>
            <Chip label={status.label}
                style={{ ...(index === selectedChip && { backgroundColor: status.color }) }} 
                onClick={() => clickHandler(status.codeStatus, index)}/>)}
    </div>
};

const Chip = ({ label, style ,onClick=()=>{}}) => {
    return <div style={style} className="chip" onClick={onClick}>{label}</div>;
}