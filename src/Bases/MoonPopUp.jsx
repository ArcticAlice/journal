import { useState, useRef, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import X from "../Assets/X";
import { importSave, exportSave } from "../utils/dataFunctions";

function MoonPopup({ show, onClose }) {
    const [importText, setImportText] = useState("");
    const [feedback, setFeedback] = useState({ msg: "", ok: true });
    const fileInputRef = useRef(null);

    // reset state every time the popup opens
    useEffect(() => {
        if (show) {
            setImportText("");
            setFeedback({ msg: "", ok: true });
        }
    }, [show]);

    const handleExport = () => {
        const data = exportSave();
        if (!data) {
            setFeedback({ msg: "Nothing to export.", ok: false });
            return;
        }

        // trigger a JSON file download
        const blob = new Blob([data], { type: "application/json" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "calendar_save.json";
        a.click();
        URL.revokeObjectURL(url);
        setFeedback({ msg: "Exported successfully!", ok: true });
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (evt) => {
            const text = evt.target.result;
            try {
                JSON.parse(text); // validate before storing
                importSave(text);
                setFeedback({ msg: "Imported successfully!", ok: true });
            } catch {
                setFeedback({ msg: "Invalid save file.", ok: false });
            }
        };
        reader.readAsText(file);

        // reset so the same file can be re-selected if needed
        e.target.value = "";
    };

    return (
        <AnimatePresence>
            {show && (
                <motion.div
                    style={popStyles.layer}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.15 }}
                >
                    {/* backdrop */}
                    <div style={popStyles.backdrop} onClick={onClose} aria-hidden="true" />

                    <motion.div
                        style={popStyles.popUp}
                        role="dialog"
                        aria-modal="true"
                        aria-label="Import / Export"
                        initial={{ scale: 0.96, y: 12 }}
                        animate={{ scale: 1, y: 0, transition: { duration: 0.22, ease: [0.25, 1, 0.5, 1], delay: 0.04 } }}
                        exit={{ scale: 0.96, transition: { duration: 0.12 } }}
                    >
                        {/* Header */}
                        <div style={popStyles.top}>
                            <div style={popStyles.closeWrap}>
                                <X onClick={onClose} color="white" aria-label="Close" />
                            </div>
                            <h2 style={popStyles.headerTitle}>Import / Export</h2>
                        </div>

                        {/* Body */}
                        <div style={popStyles.middle}>
                            <p style={popStyles.label}>Save Data</p>

                            {/* Export */}
                            <button style={popStyles.actionButton} onClick={handleExport}>
                                Export Save
                            </button>

                            <div style={popStyles.divider} />

                            {/* Import */}
                            <button
                                style={popStyles.actionButton}
                                onClick={() => fileInputRef.current?.click()}
                            >
                                Import Save
                            </button>

                            {/* hidden file input */}
                            <input
                                ref={fileInputRef}
                                type="file"
                                accept=".json,application/json"
                                style={{ display: "none" }}
                                onChange={handleFileChange}
                            />

                            {/* feedback */}
                            {feedback.msg && (
                                <p style={{ ...popStyles.feedback, color: feedback.ok ? "#00B4D8" : "#750D37" }}>
                                    {feedback.msg}
                                </p>
                            )}
                        </div>

                        {/* Footer accent */}
                        <div style={popStyles.bottom} />
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}

const popStyles = {
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
        width: "min(420px, 90vw)",
        height: "min(280px, 90vh)",
        backgroundColor: "black",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        boxSizing: "border-box",
        borderRadius: "5px",
        borderBottom: "1px solid #6D1942",
    },
    // header — identical gradient to Detail.jsx
    top: {
        flex: "1.7",
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        boxSizing: "border-box",
        background: "linear-gradient(90deg, rgba(117,13,55,1) 0%, rgba(0,180,216,1) 100%)",
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
    // body
    middle: {
        flex: "7",
        boxSizing: "border-box",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "14px",
        borderRight: "1px solid #6D1942",
        borderLeft: "1px solid #6D1942",
        padding: "20px",
    },
    label: {
        color: "rgba(255,255,255,0.45)",
        fontSize: "11px",
        letterSpacing: "0.12em",
        textTransform: "uppercase",
        margin: 0,
    },
    actionButton: {
        width: "70%",
        backgroundColor: "transparent",
        color: "white",
        border: "1px solid #6D1942",
        padding: "10px 18px",
        borderRadius: "6px",
        cursor: "pointer",
        fontSize: "14px",
        transition: "background 140ms ease",
    },
    divider: {
        width: "70%",
        height: "1px",
        background: "rgba(109,25,66,0.35)",
    },
    feedback: {
        fontSize: "11px",
        margin: 0,
    },
    // footer accent bar (mirrors Detail's borderBottom feel)
    bottom: {
        flex: "0.3",
        borderRight: "1px solid #6D1942",
        borderLeft: "1px solid #6D1942",
        borderRadius: "5px",
    },
}

export default MoonPopup;