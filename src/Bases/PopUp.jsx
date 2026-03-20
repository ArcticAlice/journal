import React, { useState, useEffect } from "react";
import { AnimatePresence, motion } from "motion/react";
import X from "../Assets/X";
import {capitalizeWords} from "../utils/dataFunctions";

function PopUp({ show, onClose, onSave }) {
    const [task, setTask] = useState("");
    const [tag, setTag] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        if (show) {
            setTask("");
            setTag("");
            setError("");
        }
    }, [show]);

    const handleSave = () => {
        if (task.trim() === "") {
            setError("Task name cannot be empty.");
            return;
        }
        setError("");

        onSave({
            taskName: capitalizeWords(task),
            taskTag: tag.toUpperCase(),
            description: "",
            difficulty: ""
        });

        onClose();
    };

    return (
        <AnimatePresence>
            {show && (
                <motion.div
                    style={styles.layer}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.15 }}
                >
                    <div style={styles.backdrop} onClick={onClose} aria-hidden="true" />
                    <motion.div
                        style={styles.popUp}
                        role="dialog"
                        aria-modal="true"
                        aria-label="Add task"
                        initial={{ scale: 0.96, y: 12 }}
                        animate={{ scale: 1, y: 0, transition: { duration: 0.22, ease: [0.25, 1, 0.5, 1], delay: 0.04 } }}
                        exit={{ scale: 0.96, transition: { duration: 0.12 } }}
                    >
                        <div style={styles.xBox}>
                            <X onClick={onClose} color="#750D37" aria-label="Close" />
                        </div>
                        <textarea
                            style={styles.textArea}
                            placeholder="Task name"
                            value={task}
                            onChange={(e) => { setTask(e.target.value); if (error) setError(""); }}
                            autoFocus
                        />
                        {error && <p style={styles.error}>{error}</p>}
                        <textarea
                            style={styles.tagArea}
                            placeholder="Tag"
                            value={tag}
                            onChange={(e) => setTag(e.target.value)}
                        />
                        <button style={styles.saveButton} onClick={handleSave}>
                            Save
                        </button>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}

export default PopUp;


const styles = {

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

    popUp: {
        position: "relative",
        width: "min(500px, 90vw)",
        height: "250px",
        backgroundColor: "black",
        padding: "20px",
        overflow: "auto",
        borderRadius: "15px",
        display: "flex",
        flexDirection: "column",
        boxSizing: "border-box",
        border: "1px solid #750D37"
    },

    saveButton: {
        position: "absolute",
        bottom: "5%",
        right: "2%",
        backgroundColor: "#00B4D8",
        color: "white",
        border: "none",
        padding: "8px 12px",
        borderRadius: "4px",
        cursor: "pointer"
    },

    xBox: {
        position: "absolute",
        top: "5%",
        right: "3%",
        cursor: "pointer"
    },

    error: {
        position: "absolute",
        bottom: "18%",
        left: "5%",
        color: "#750D37",
        fontSize: "11px",
        margin: 0,
    },

    textArea: {
        flexGrow: 1,
        resize: "none",
        width: "100%",
        height: "auto",
        marginBottom: "40px",
        marginTop: "20px",
        boxSizing: "border-box",
        border: "none",
        outline: "none",
        backgroundColor: "transparent",
        color: "#00B4D8",
        lineHeight: "1.5",
    },

    tagArea: {
        resize: "none",
        width: "30%",
        height: "12%",
        border: "none",
        outline: "none",
        backgroundColor: "black",
        position: "absolute",
        bottom: "5%",
        left: "5%",
        color: "#00B4D8",
        overflow: "hidden"
    }
};
