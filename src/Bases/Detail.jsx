import X from "../Assets/X";
import { useEffect, useState } from "react";
import { capitalizeWords } from "../utils/dataFunctions";

function Detail({ show, info, onClose, onSave }) {
    const [task, setTask] = useState("");
    const [tag, setTag] = useState("");
    const [description, setDescription] = useState("");

    useEffect(() => {
        if (!show) return;

        setTask(info?.taskName || "");
        setTag(info?.taskTag || "");
        setDescription(info?.description || "");
    }, [show, info]);

    const handleSave = () => {
        if (task.trim() === "") {
            alert("Task name cannot be empty!");
            return;
        }

        onSave({
            taskName: capitalizeWords(task),
            taskTag: tag.toUpperCase(),
            description: description,
        });

        onClose();
    };

    if (!show) return null;

    return (
        <div style={styles.popUp}>
            {/* Header */}
            <div style={styles.top}>
                <div style={styles.closeWrap}>
                    <X onClick={onClose}/>
                </div>
                <h2 style={styles.headerTitle}>Task Details</h2>
            </div>

            {/* Middle */}
            <div style={styles.middle}>
                <textarea
                    style={styles.taskName}
                    placeholder="Add task..."
                    value={task}
                    onChange={(e) => setTask(e.target.value)}
                />

                <textarea
                    style={styles.descriptionInput}
                    placeholder="Add description..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
            </div>

            {/* Footer */}
            <div style={styles.bottom}>
                <textarea
                    style={styles.tag}
                    placeholder="Tag!"
                    value={tag}
                    onChange={(e) => setTag(e.target.value)}
                />
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
};