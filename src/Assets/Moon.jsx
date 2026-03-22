import { useState } from "react";

function Moon({ width = "50px", height = "50px", color = "#750D37", stroke = "white", strokeWidth = 1, ...props }) {
    const [hovered, setHovered] = useState(false);

    const base = {
        cursor: "pointer",
        transition: "transform 140ms ease, filter 140ms ease, drop-shadow 140ms ease",
        transform: hovered ? "scale(1.06)" : "scale(1)",
        transformOrigin: "center",
        // red glow using CSS filters (works well for SVGs)
        filter: hovered
            ? "drop-shadow(0 0 10px rgba(117, 13, 55, 0.75)) drop-shadow(0 0 2px rgba(117, 13, 55, 0.95))"
            : "drop-shadow(0 0 4px rgba(117, 13, 55, 0.20))",
    };

    return (
        <svg
            style={base}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            onFocus={() => setHovered(true)}
            onBlur={() => setHovered(false)}
            tabIndex={0}
            xmlns="http://www.w3.org/2000/svg"
            width={width}
            height={height}
            viewBox="0 -960 960 960"
            fill={color}
            stroke={stroke}
            strokeWidth={strokeWidth}
            {...props}
        >
            <path d="M600-640 480-760l120-120 120 120-120 120Zm200 120-80-80 80-80 80 80-80 
            80ZM483-80q-84 0-157.5-32t-128-86.5Q143-253 111-326.5T79-484q0-146 93-257.5T409-880q-18 
            99 11 193.5T520-521q71 71 165.5 100T879-410q-26 144-138 237T483-80Zm0-80q88 0 
            163-44t118-121q-86-8-163-43.5T463-465q-61-61-97-138t-43-163q-77 43-120.5 118.5T159-484q0 
            135 94.5 229.5T483-160Zm-20-305Z"/>
        </svg>
    );
}

export default Moon;
