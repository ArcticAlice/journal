import { useState, useEffect } from "react";
import PopUp from "../Bases/PopUp";
import Template from "../Bases/Template";
import Plus from "../Assets/Plus";
import X from "../Assets/X";
import { getData, saveData, deleteData, editData } from "../utils/dataFunctions"; // <-- import

function JournalPage({ year, month, day, onBack }) {
  const [pop, changePop] = useState(false);
  const [entryList, setEntryList] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [initialTask, setInitialTask] = useState("");
  const [initialTag, setInitialTag] = useState("");

  const dateKey = `${year}-${String(Number(month) + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;

  useEffect(() => {
    const entries = getData();
    if (entries[dateKey]) setEntryList(entries[dateKey]);
  }, [dateKey]);

  const handleSave = (newEntry) => {
    if (editingId) {
      editData(dateKey, editingId, newEntry);
    } else {
      saveData(dateKey, newEntry);
    }

    setEntryList(getData()[dateKey] || []);
    setEditingId(null);
    setInitialTag("");
    setInitialTask("");
    changePop(false);
  };

  const handleDelete = (id) => {
    deleteData(dateKey, id);
    setEntryList(getData()[dateKey] || []);
  };

  const handleEdit = (id) => {
    const entries = getData()[dateKey] || [];
    const selected = entries.find(e => e.id === id);
    if (!selected) return;

    setInitialTask(selected.taskName);
    setInitialTag(selected.taskTag);
    setEditingId(id);
    changePop(true);
  };

  const closePopUp = () => {
    changePop(false);
    setEditingId(null);
    setInitialTag("");
    setInitialTask("");
  };

  const pageStyle = {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    backgroundColor: "#0A0A0A",
    padding: "2rem",
    boxSizing: "border-box",
  };

  const addStyle = {
    position: "absolute",
    bottom: "1rem",
    right: "1rem",
    border: "1px solid #750D37",
    borderRadius: "12px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  };

  const dateStyle = {
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
  };

  const container = {
    position: "absolute",
    top: "52%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    display: "grid",
    gridTemplateColumns: "1fr 1fr 1fr",
    width: "85%",
    height: "80%",
  };

  return (
    <div style={pageStyle}>
      <X width="40px" height="40px" color="#750D37" onClick={onBack} />

      <div style={dateStyle}>{new Date(year, month, day).toDateString()}</div>

      <div style={addStyle}>
        <Plus width="55px" height="55px" color="#00B4D8" onClick={() => changePop(true)} />
      </div>

      <div style={container}>
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
        onSave={handleSave}
        initialTask={initialTask}
        initialTag={initialTag}
      />
    </div>
  );
}

export default JournalPage;