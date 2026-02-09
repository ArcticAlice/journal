import { useState, useEffect } from "react";
import PopUp from "../Bases/PopUp";
import Template from "../Bases/Template";
import Plus from "../Assets/Plus";
import X from "../Assets/X";
import Detail from "../Bases/Detail";
import { getData, saveData, deleteData, editData } from "../utils/dataFunctions";

function JournalPage({ year, month, day, onBack }) {
    const [pop, changePop] = useState(false);
    const [detailPop, changeDetailPop] = useState(false);
    const [entryList, setEntryList] = useState([]);
    const [editingId, setEditingId] = useState(null);

    // keep the same field names you store in localStorage
    const [initialInfo, setInitialInfo] = useState({
        taskName: "",
        taskTag: "",
        description: "",
    });

    const dateKey = `${year}-${String(Number(month) + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;

    useEffect(() => {
        const entries = getData();
        setEntryList(entries[dateKey] || []);
    }, [dateKey]);

    const refreshList = () => {
        setEntryList(getData()[dateKey] || []);
    };

    const closePopUp = () => {
        changePop(false);
        setEditingId(null);
        setInitialInfo({
            taskName: "",
            taskTag: "",
            description: "",
        });
    };

    const closeDetailPopUp = () => {
        changeDetailPop(false);
        setEditingId(null);
        setInitialInfo({
            taskName: "",
            taskTag: "",
            description: "",
        });
    };

    // handles "add new" from small popup
    const handleCreate = (newEntry) => {
        saveData(dateKey, newEntry);
        refreshList();
        closePopUp();
    };

    // handles "save edit" from Detail popup
    const handleUpdate = (updatedEntry) => {
        if (!editingId) return;
        editData(dateKey, editingId, updatedEntry);
        refreshList();
        closeDetailPopUp();
    };

    const handleDelete = (id) => {
        deleteData(dateKey, id);
        refreshList();
    };

    const handleEdit = (id) => {
        const entries = getData()[dateKey] || [];
        const selected = entries.find(e => e.id === id);
        if (!selected) return;

        setInitialInfo({
            taskName: selected.taskName || "",
            taskTag: selected.taskTag || "",
            description: selected.description || "",
        });

        setEditingId(id);
        changeDetailPop(true);
    };

    return (
        <div style={styles.page}>
            <X width="40px" height="40px" color="#750D37" onClick={onBack} />

            <div style={styles.date}>{new Date(year, month, day).toDateString()}</div>

            <div style={styles.add}>
                <Plus width="55px" height="55px" color="#00B4D8" onClick={() => changePop(true)} />
            </div>

            <div style={styles.container}>
                {entryList.map((entry) => (
                    <Template
                        key={entry.id}
                        entry={entry.taskName}
                        onDelete={() => handleDelete(entry.id)}
                        onEdit={() => handleEdit(entry.id)}
                    />
                ))}
            </div>

            <PopUp
                show={pop}
                onClose={closePopUp}
                onSave={handleCreate}
            />

            <Detail
                show={detailPop}
                info={initialInfo}
                onClose={closeDetailPopUp}
                onSave={handleUpdate}
                date={dateKey}
            />
        </div>
    );
}

export default JournalPage;


const styles = {
    page: {
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        backgroundColor: "#0A0A0A",
        padding: "2rem",
        boxSizing: "border-box",
    },
    add: {
        position: "absolute",
        bottom: "1rem",
        right: "1rem",
        border: "1px solid #750D37",
        borderRadius: "12px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    },
    date: {
        position: "absolute",
        top: "2%",
        right: "0.5%",
        fontSize: "1.5rem",
        border: "1px solid #750D37",
        borderRadius: "12px",
        color: "#00B4D8",
        width: "220px",
        height: "50px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    container: {
        position: "absolute",
        top: "52%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        display: "grid",
        gridTemplateColumns: "1fr 1fr 1fr",
        width: "85%",
        height: "80%",
    }
}