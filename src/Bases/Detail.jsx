import X from "../Assets/X";
import { useEffect, useState } from "react";

function Detail({ show, info, onClose, onSave, date }) {
    const [task, setTask] = useState("");
    const [tag, setTag] = useState("");
    const [description, setDescription] = useState("");
    const [difficulty, setDifficulty] = useState("");

    useEffect(() => {
        if (!show) return;

        setTask(info?.taskName || "");
        setTag(info?.taskTag || "");
        setDescription(info?.description || "");
        setDifficulty(info?.difficulty || "");
    }, [show, info]);

    const handleSave = () => {
        if (task.trim() === "") {
            alert("Task name cannot be empty!");
            return;
        }

        onSave({
            taskName: task,
            taskTag: tag.toUpperCase(),
            description: description,
            difficulty: difficulty
        });

        onClose();
    };

    if (!show) return null;

    return (
        <div style={styles.popUp}>
            {/* Header */}
            <div style={styles.top}>
                <div style={styles.closeWrap}>
                    <X onClick={onClose} />
                </div>
                <h2 style={styles.headerTitle}>Task Details</h2>
            </div>

            {/* Middle */}
            <div style={styles.middle}>
                {/* Left (75%) */}
                <div style={styles.leftSection}>
                    <p style={styles.taskName}>{task || "Task"}</p>

                    <textarea
                        style={styles.descriptionInput}
                        placeholder="Add description..."
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>

                {/* Right (25%) */}
                <div style={styles.rightSection}>

                    <textarea
                        style={styles.tag}
                        placeholder="Tag!"
                        value={tag}
                        onChange={(e) => setTag(e.target.value)}
                    />

                    <div style={styles.difficultyBox}>
                        <textarea
                            style={styles.difficultyText}
                            placeholder="Difficulty (1-5)"
                            value={difficulty}
                            onChange={(e) => setDifficulty(e.target.value)}
                        />
                    </div>
                </div>
            </div>

            {/* Footer */}
            <div style={styles.bottom}>
                <button style={styles.date}>
                    {date}
                </button>
                <button style={styles.saveButton} onClick={handleSave}>
                    Save
                </button>
            </div>
        </div>
    );
}

export default Detail;

const styles = {
    popUp: {
        position: "absolute",
        width: "700px",
        height: "600px",
        backgroundColor: "black",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        zIndex: 100,
        overflow: "hidden",
        borderRadius: "15px",
        display: "flex",
        flexDirection: "column",
        boxSizing: "border-box",
        border: "2px solid #750D37",
    },

    // ===== Header (5%) =====
    top: {
        flex: "0.9",
        borderBottom: "2px solid #750D37",
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        boxSizing: "border-box",
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
        color: "#00B4D8",
        fontSize: "16px",
        fontWeight: "500",
        margin: 0,
    },

    // ===== Middle (90%) =====
    middle: {
        flex: "8",
        display: "flex",
        flexDirection: "row",
        boxSizing: "border-box",
        overflow: "hidden",
    },

    leftSection: {
        flex: "8",
        borderRight: "2px solid #750D37",
        boxSizing: "border-box",
        padding: "20px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        gap: "15px",
    },

    taskName: {
        color: "#00B4D8",
        fontSize: "28px",
        fontWeight: "400",
        outline: "none",
    },

    descriptionInput: {
        background: "transparent",
        border: "2px solid #750D37",
        borderRadius: "15px",
        color: "#00B4D8",
        fontSize: "14px",
        padding: "12px",
        outline: "none",
        width: "100%",
        height: "340px",
        resize: "none",
        fontFamily: "inherit",
        boxSizing: "border-box",
    },

    // ===== Right (25%) =====
    rightSection: {
        flex: "2",
        boxSizing: "border-box",
        position: "relative",
    },
    tag: {
        resize: "none",
        background: "transparent",
        border: "none",
        outline: "none",
        fontSize: "14px",
        position: "absolute",
        left: "50%",
        top: "25%",
        transform: "translateX(-50%)",
        width: "100%",
        color: "#00B4D8",
        textAlign: "center",
    },
    difficultyBox: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        position: "absolute",
        top: "75%",
        left: "50%",
        transform: "translateX(-50%)",
        boxSizing: "border-box",
        width: "100%",
        height: "25%",
    },
    difficultyText: {
        resize: "none",
        background: "transparent",
        border: "none",
        outline: "none",
        borderRadius: "5px",
        color: "#00B4D8",
        boxSizing: "border-box",
        flex: "4",
        textAlign: "center",
    },

    // ===== Footer (5%) =====
    bottom: {
        flex: "1.1",
        borderTop: "2px solid #750D37",
        display: "flex",
        alignItems: "center",
        boxSizing: "border-box",
        postion: "relative",
    },
    date: {
        backgroundColor: "#00B4D8",
        color: "white",
        border: "none",
        padding: "10px 18px",
        borderRadius: "6px",
        position: "absolute",
        left: "3%",
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
};