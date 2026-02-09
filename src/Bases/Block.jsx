import { useState } from "react";

function Number({ day }) {
    const Style = {
        width: "30%",
        height: "30%",
        position: "absolute",
        bottom: "0%",
        right: "0%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        color: "#00B4D8" // changed to red
    };

    return <div style={Style}>{day}</div>;
}

function Block({ day, onClick, fill = false, circle = false }) {
    const [hovered, setHovered] = useState(false);

    const glowColor = "#750D37";

    const Style = {
        width: "90%",
        height: "90%",
        borderRadius: "7%",
        border: `1px solid ${glowColor}`,
        position: "relative",
        cursor: "pointer",
        display: "inline-block",
        marginLeft: "15px",
        marginTop: "1px",
        marginBottom: "1px",
        backgroundColor: "rgba(117, 13, 55, 0.12)",

        transition: "transform 140ms ease, box-shadow 140ms ease",

        // slight expand on hover
        transform: hovered ? "scale(1.04)" : "scale(1)",
        transformOrigin: "center",

        // red glow effect
        boxShadow: hovered
            ? `0 0 18px rgba(117, 13, 55, 0.65), 0 0 2px rgba(117, 13, 55, 0.95), inset 0 0 10px rgba(117, 13, 55, 0.18)`
            : `0 0 10px rgba(117, 13, 55, 0.18), inset 0 0 8px rgba(117, 13, 55, 0.08)`,

        // optional: bring hovered tile above neighbors
        zIndex: hovered ? 2 : 1,
    };

    const fillStyle = {
        width: "6px",
        height: "6px",
        border: "1px solid #00B4D8",
        backgroundColor: fill ? "#00B4D8" : "transparent",
        borderRadius: "50%",
        position: "absolute",
        top: "5%",
        left: "5%",
    };

    return (
        <div
            style={Style}
            onClick={onClick}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            onFocus={() => setHovered(true)}
            onBlur={() => setHovered(false)}
            tabIndex={0}
        >
            {day && <Number day={day} />}
            {circle && <div style={fillStyle}></div>}
        </div>
    );
}

export default Block;
