import React, { useState } from "react";
import './Filters.css'
import { statuses } from "../../dec";
import { Chip } from "../Chip/Chip";
export const Filters = ({ setFilterValue}) => {
    const chipsList = [...statuses, { label: 'כולם', color: '#3F3323' }];
    const [selectedChip, setSelectedChip] = useState(chipsList.length-1);
    const clickHandler = (status, index) => { 
        setSelectedChip(prev=> prev !== index? index : chipsList.length-1); 
        setFilterValue(prev => ({ ...prev, status: prev.status === status ? '' : status }));
    }
    return <div className="chips-container">
        {chipsList.map((status, index) =>
            <Chip label={status.label}
                style={{ ...(index === selectedChip && { backgroundColor: status.color }) }} 
                onClick={() => clickHandler(status.codeStatus, index)}/>)}
    </div>
};
