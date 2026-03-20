import { useState } from "react";
import { motion } from "framer-motion";
import Remove from "../Assets/Remove";
import Vert from "../Assets/Vert";

function Template({ entry, onDelete, onEdit }) {
    const [hovered, setHovered] = useState(false);

    const glowColor = "#750D37";

    const boxStyle = {
        ...style.box,
        transition: "box-shadow 140ms ease",
        boxShadow: hovered
            ? `0 0 18px rgba(117, 13, 55, 0.65), 0 0 2px rgba(117, 13, 55, 0.95), inset 0 0 10px rgba(117, 13, 55, 0.18)`
            : `0 0 10px rgba(117, 13, 55, 0.18), inset 0 0 8px rgba(117, 13, 55, 0.08)`,
        border: `1px solid ${glowColor}`,
        zIndex: hovered ? 2 : 1,
    };

    return (
        <motion.div
            style={boxStyle}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            onFocus={() => setHovered(true)}
            onBlur={() => setHovered(false)}
            tabIndex={0}
            aria-label={entry}
            onKeyDown={(e) => { if (e.key === 'Enter') onEdit(); }}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, transition: { duration: 0.12 } }}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.22, ease: [0.25, 1, 0.5, 1] }}
        >
            <Vert onClick={onEdit} color="#00B4D8" aria-label="Edit task" />
            <p style={style.text}>{entry}</p>
            <Remove onClick={onDelete} aria-label="Delete task" />
        </motion.div>
    );
}

export default Template;

const style = {
    box: {
        position: "relative",
        width: "90%",
        height: "5vh",
        padding: "5px 10px",
        border: "1px solid #750D37",
        marginBottom: "10px",
        borderRadius: "5px",
        display: "grid",
        gridTemplateColumns: "auto 1fr auto",
        alignItems: "center",
        gap: "10px",
    },
    text: {
        margin: "0",
        color: "#00B4D8",
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis",
    },
};
