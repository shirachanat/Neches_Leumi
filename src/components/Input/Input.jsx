import React from "react";
import './Input.css'
export const Input = ({ onChange, onClean, value }) => {
    return (
        <div style={{ position: "relative" }}>
            <input type="text" id="search-input" placeholder="חיפוש איש קשר" onChange={onChange} value={value} />
            {value && <button id="clear-input" title="Clear input" onClick={onClean}>
                <svg width="24" height="24" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z" />
                </svg>
            </button>}
        </div>
    )
}