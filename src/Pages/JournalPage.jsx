import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import PopUp from "../Bases/PopUp";
import Template from "../Bases/Template";
import Plus from "../Assets/Plus";
import X from "../Assets/X";

function JournalPage() {

  const navigate = useNavigate();
  const { year, month, day } = useParams();
  const [pop, changePop] = useState(false);

  // controls the display of entries
  const [entryList, setEntryList] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);

  // controls the text field in popUp
  const [initialTask, setInitialTask] = useState("");
  const [initialTag, setInitialTag] = useState("");

  const dateKey = `${year}-${String(Number(month) + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;

  useEffect(() => {
    const saved = localStorage.getItem("entries");
    if (saved) {
      const parsed = JSON.parse(saved);
      if (parsed[dateKey]) {
        setEntryList(parsed[dateKey]);
      }
    }
  }, [dateKey]);

  // Adds new data
  const handleSave = (newEntry) => {

    // copying data from local database to array
    const allEntries = JSON.parse(localStorage.getItem("entries")) || {};
    const dateEntries = allEntries[dateKey] || [];

    if (editingIndex !== null) {
      // Edit existing entries to array
      dateEntries[editingIndex] = newEntry;
    } else {
      // Add new entries to array
      dateEntries.push(newEntry);
    }

    // setting local storage to new array
    allEntries[dateKey] = dateEntries;
    localStorage.setItem("entries", JSON.stringify(allEntries));

    // Updated display on screen
    setEntryList(dateEntries);

    // setting everything back to no value
    setEditingIndex(null);
    setInitialTag("");
    setInitialTask("");
    changePop(false);
  };

  // deletes data by index
  const handleDelete = (index) => {
    const updatedList = entryList.filter((_, i) => i !== index);
    setEntryList(updatedList);

    const allEntries = JSON.parse(localStorage.getItem("entries")) || {};
    allEntries[dateKey] = updatedList;
    localStorage.setItem("entries", JSON.stringify(allEntries));
  };

  // only opens and configure data in PopUp when editing
  const handleEdit = (index) => {
    const allEntries = JSON.parse(localStorage.getItem("entries")) || {};
    const dateEntries = allEntries[dateKey] || [];

    const selected = dateEntries[index];
    if (!selected) return;

    setInitialTask(selected.taskName);
    setInitialTag(selected.taskTag);
    setEditingIndex(index);
    changePop(true);
  };

  // clears old data when user presses x button in PopUp
  const closePopUp = () => {
    changePop(false);
    setEditingIndex(null);
    setInitialTag("");
    setInitialTask("");
  }

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
    border: "1px solid #A663CC",
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
    border: "1px solid #A663CC",
    borderRadius: "12px",
    color: "white",
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

      <X width="40px" height="40px" color="#A663CC" onClick={() => navigate("/")} />

      <div style={dateStyle}>
        {new Date(year, month, day).toDateString()}
      </div>

      <div style={addStyle}>
        <Plus width="55px" height="55px" color="white" onClick={() => changePop(true)} />
      </div>

      <div style={container}>
        {entryList.map((entry, index) => (
          <Template
            key={index}
            entry={entry.taskName}
            onDelete={() => handleDelete(index)}
            onEdit={() => handleEdit(index)}
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
