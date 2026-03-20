import X from "../Assets/X";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { capitalizeWords } from "../utils/dataFunctions";

function Detail({ show, info, onClose, onSave }) {
    const [task, setTask] = useState("");
    const [tag, setTag] = useState("");
    const [description, setDescription] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        if (!show) return;

        setTask(info?.taskName || "");
        setTag(info?.taskTag || "");
        setDescription(info?.description || "");
        setError("");
    }, [show, info]);

    const handleSave = () => {
        if (task.trim() === "") {
            setError("Task name cannot be empty.");
            return;
        }
        setError("");

        onSave({
            taskName: capitalizeWords(task),
            taskTag: tag.toUpperCase(),
            description: description,
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
                        aria-label="Task details"
                        initial={{ scale: 0.96, y: 12 }}
                        animate={{ scale: 1, y: 0, transition: { duration: 0.22, ease: [0.25, 1, 0.5, 1], delay: 0.04 } }}
                        exit={{ scale: 0.96, transition: { duration: 0.12 } }}
                    >
                        {/* Header */}
                        <div style={styles.top}>
                            <div style={styles.closeWrap}>
                                <X onClick={onClose} color="white" aria-label="Close" />
                            </div>
                            <h2 style={styles.headerTitle}>Details</h2>
                        </div>

                        {/* Middle */}
                        <div style={styles.middle}>
                            <textarea
                                style={styles.taskName}
                                placeholder="Task name"
                                value={task}
                                onChange={(e) => { setTask(e.target.value); if (error) setError(""); }}
                                autoFocus
                            />

                            <textarea
                                style={styles.descriptionInput}
                                placeholder="Description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </div>

                        {/* Footer */}
                        <div style={styles.bottom}>
                            <textarea
                                style={styles.tag}
                                placeholder="Tag"
                                value={tag}
                                onChange={(e) => setTag(e.target.value)}
                            />
                            {error && <p style={styles.error}>{error}</p>}
                            <button style={styles.saveButton} onClick={handleSave}>
                                Save
                            </button>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}

export default Detail;

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
        width: "min(700px, 90vw)",
        height: "min(600px, 90vh)",
        backgroundColor: "black",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        boxSizing: "border-box",
        borderRadius: "5px",
        borderBottom: "1px solid #6D1942",
    },

    // ===== Header (5%) =====
    top: {
        flex: "0.9",
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        boxSizing: "border-box",
        background: "linear-gradient(90deg,rgba(117, 13, 55, 1) 0%, rgba(0, 180, 216, 1) 100%)",
        borderTopLeftRadius: "5px",
        borderTopRightRadius: "5px",
    },
    closeWrap: {
        position: "absolute",
        left: "10px",
        top: "50%",
        transform: "translateY(-50%)",
        display: "flex",
        alignItems: "center",
    },
    headerTitle: {
        color: "white",
        fontSize: "16px",
        fontWeight: "500",
        margin: 0,
    },

    // ===== Middle (90%) =====
    middle: {
        flex: "7.8",
        postion: "relative",
        boxSizing: "border-box",
        overflow: "hidden",
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        borderRight: "1px solid #6D1942",
        borderLeft: "1px solid #6D1942",
    },

    taskName: {
        color: "white",
        fontSize: "28px",
        fontWeight: "400",
        position: "absolute",
        resize: "none",
        background: "transparent",
        border: "none",
        outline: "none",
        paddingTop: "25px",
        width: "90%",
    },

    descriptionInput: {
        background: "transparent",
        border: "none",
        borderRadius: "10px",
        color: "white",
        fontSize: "14px",
        padding: "12px",
        outline: "none",
        width: "90%",
        height: "60%",
        resize: "none",
        boxSizing: "border-box",
        position: "absolute",
        top: "23%",
        lineHeight: "1.5",
    },

    // ===== Footer (5%) =====
    bottom: {
        flex: "1.2",
        display: "flex",
        alignItems: "center",
        boxSizing: "border-box",
        postion: "relative",
        borderRight: "1px solid #6D1942",
        borderLeft: "1px solid #6D1942",
        borderRadius: "5px",
    },
    tag: {
        resize: "none",
        background: "transparent",
        border: "none",
        outline: "none",
        fontSize: "14px",
        position: "absolute",
        left: "3%",
        color: "white",
        paddingTop: "20px",
    },
    saveButton: {
        backgroundColor: "#00B4D8",
        color: "white",
        border: "none",
        padding: "10px 18px",
        borderRadius: "6px",
        cursor: "pointer",
        position: "absolute",
        right: "3%",
    },

    error: {
        color: "#750D37",
        fontSize: "11px",
        margin: 0,
        position: "absolute",
        left: "50%",
        transform: "translateX(-50%)",
        whiteSpace: "nowrap",
    },
};