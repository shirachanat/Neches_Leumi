import React, { useState } from "react";
import "./DraggableOverlay.css";

const DraggableOverlay = ({ children }) => {
    const [position, setPosition] = useState({ top: 630, left: 80 }); // Initial position
    const [isDragging, setIsDragging] = useState(false);
    const [start, setStart] = useState({ x: 0, y: 0 });

    const handleMouseDown = (e) => {
        setIsDragging(true);
        setStart({
            x: e.clientX - position.left,
            y: e.clientY - position.top
        });
    };

    const handleMouseMove = (e) => {
        if (isDragging) {
            setPosition({
                top: e.clientY - start.y,
                left: e.clientX - start.x,
            });
        }
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    };

    return (
        <div
            className="overlay"
            style={{
                top: `${position.top}px`,
                left: `${position.left}px`,
            }}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
        >
            {children}
        </div>
    );
};

export default DraggableOverlay;
