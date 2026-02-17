import React, { useState, useEffect } from "react";
import X from "../Assets/X";
import {capitalizeWords} from "../utils/dataFunctions";

function PopUp({ show, onClose, onSave }) {
    const [task, setTask] = useState("");
    const [tag, setTag] = useState("");

    useEffect(() => {
        if (show) {
            setTask("");
            setTag("");
        }
    }, [show]);

    const handleSave = () => {
        if (task.trim() === "") {
            alert("Task name cannot be empty!");
            return;
        }

        onSave({
            taskName: capitalizeWords(task),
            taskTag: tag.toUpperCase(),
            description: "",
            difficulty: ""
        });

        onClose();
    };

    if (!show) return null;

    return (
        <div style={styles.popUp}>
            <div style={styles.xBox}>
                <X onClick={onClose} color="#750D37" />
            </div>
            <textarea
                style={styles.textArea}
                placeholder="Enter Task!"
                value={task}
                onChange={(e) => setTask(e.target.value)}
            />
            <textarea
                style={styles.tagArea}
                placeholder="Tag!"
                value={tag}
                onChange={(e) => setTag(e.target.value)}
            />
            <button style={styles.saveButton} onClick={handleSave}>
                Save
            </button>
        </div>
    );
}

export default PopUp;


const styles = {
    
    popUp: {
        position: "relative",
        width: "500px",
        height: "250px",
        backgroundColor: "black",
        padding: "20px",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        zIndex: 100,
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
        backgroundColor: "#750D37",
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
