import X from "../Assets/X";
import { AnimatePresence, motion } from "motion/react";

function Summary({ show, onClose, summary }) {
    
    const summaryData =
        !summary || summary.length === 0 ? (
            <p style={style.text}>Nothing logged this month.</p>
        ) : (
            <ul style={style.text}>
                {summary.map((s, index) => (
                    <li key={index}>
                        {s.tag.toLowerCase()} — {s.count} days ({s.percent}%)
                    </li>
                ))}
            </ul>
        );

    return (
        <AnimatePresence>
            {show && (
                <motion.div
                    style={style.layer}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.15 }}
                >
                    <div style={style.backdrop} onClick={onClose} aria-hidden="true" />
                    <motion.div
                        style={style.box}
                        role="dialog"
                        aria-modal="true"
                        aria-label="Monthly summary"
                        initial={{ scale: 0.96, y: 12 }}
                        animate={{ scale: 1, y: 0, transition: { duration: 0.22, ease: [0.25, 1, 0.5, 1], delay: 0.04 } }}
                        exit={{ scale: 0.96, transition: { duration: 0.12 } }}
                    >
                        <X onClick={onClose} color="#750D37" aria-label="Close" />
                        {summaryData}
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}

export default Summary;

const style = {
    layer: {
        position: "fixed",
        inset: 0,
        zIndex: 99,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },

    backdrop: {
        position: "absolute",
        inset: 0,
        background: "rgba(0, 0, 0, 0.7)",
    },

    box: {
        position: "relative",
        width: "min(800px, 90vw)",
        height: "min(350px, 90vh)",
        backgroundColor: "black",
        padding: "20px",
        overflow: "auto",
        borderRadius: "15px",
        display: "flex",
        flexDirection: "column",
        boxSizing: "border-box",
        border: "1px solid #00B4D8",
    },
    text: {
        color: "#FFFFFF",
        flexGrow: 1,
        resize: "none",
        width: "auto",
        height: "auto",
        margin: "15px",
        boxSizing: "border-box",
        border: "none",
        outline: "none",
        backgroundColor: "black",
        fontWeight: "100"
    }
}