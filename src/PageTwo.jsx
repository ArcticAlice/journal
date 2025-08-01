import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import PopUp from "./Bases/PopUp";
import Template from "./Bases/Template";
import Plus from "./Assets/Plus";
import X from "./Assets/X";

function PageTwo() {
  const { year, month, day } = useParams();
  const navigate = useNavigate();
  const [pop, changePop] = useState(false);
  const [entryList, setEntryList] = useState([]);

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

  const handleSave = (data) => {
    
    const newEntry = {
      taskName: data.taskName,
      taskTag: data.taskTag.toUpperCase(),
    };

    const updatedList = [...entryList, newEntry];
    setEntryList(updatedList);

    const allEntries = JSON.parse(localStorage.getItem("entries")) || {};
    allEntries[dateKey] = updatedList;
    localStorage.setItem("entries", JSON.stringify(allEntries));

    changePop(false);
  };

  const handleDelete = (indexToRemove) => {
    const updatedList = entryList.filter((_, i) => i !== indexToRemove);
    setEntryList(updatedList);

    const allEntries = JSON.parse(localStorage.getItem("entries")) || {};
    allEntries[dateKey] = updatedList;
    localStorage.setItem("entries", JSON.stringify(allEntries));
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
        <Plus width="55px" height="55px" color="white" onClick={() => changePop(true)}/>
      </div>

      <div style={container}>
        {entryList.map((entry, index) => (
          <Template
            key={index}
            entry={entry.taskName}
            onDelete={() => handleDelete(index)}
          />
        ))}
      </div>

      <PopUp show={pop} onClose={() => changePop(false)} onSave={handleSave} />

    </div>
  );
}

export default PageTwo;
