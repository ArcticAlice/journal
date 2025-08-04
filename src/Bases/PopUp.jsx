import React, { useState, useEffect } from "react";
import X from "../Assets/X";

// show is boolean variable
function PopUp({ show, onClose, onSave, initialTask = "", initialTag = "" }) {

    const [task, setTask] = useState("");
    const [tag, setTag] = useState("");

    useEffect(() => {
        if (show) {
            setTask(initialTask);
            setTag(initialTag);
        }
    }, [show, initialTask, initialTag]);

    if (!show) return null;

    const handleSave = () => {
        if (task.trim() === "") {
            alert("Task name cannot be empty!");
            return;
        }
        onSave({ taskName: task, taskTag: tag.toUpperCase() });
        setTask("");
        onClose();
    };

    const popUpStyle = {
        position: "absolute",
        width: "500px",
        height: "150px",
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
        border: "1px solid #A663CC"
    };

    const saveButtonStyle = {
        position: "absolute",
        bottom: "5%",
        right: "2%",
        backgroundColor: "#A663CC",
        color: "white",
        border: "none",
        padding: "8px 12px",
        borderRadius: "4px",
        cursor: "pointer"
    };

    const textareaStyle = {
        flexGrow: 1,
        resize: "none",
        width: "100%",
        height: "auto",
        marginTop: "10px",
        marginBottom: "40px",
        boxSizing: "border-box",
        border: "none",
        outline: "none",
        backgroundColor: "black",
        color: "white"
    };

    const tagAreaStyle = {
        resize: "none",
        width: "30%",
        height: "12%",
        border: "none",
        outline: "none",
        backgroundColor: "black",
        position: "absolute",
        bottom: "10%",
        left: "3%",
        color: "white",
        overflow: "hidden"
    }

    return (
        <div style={popUpStyle}>
            <X onClick={onClose} color="#A663CC" />
            <textarea
                style={textareaStyle}
                placeholder="Enter Task!"
                value={task}
                onChange={(e) => setTask(e.target.value)}
            />
            <textarea
                style={tagAreaStyle}
                placeholder="Tag!"
                value={tag}
                onChange={(e) => setTag(e.target.value)}
            />
            <button style={saveButtonStyle} onClick={handleSave}>
                Save
            </button>
        </div>
    );
}

export default PopUp;
