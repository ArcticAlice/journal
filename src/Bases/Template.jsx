import Remove from "../Assets/Remove";
import Vert from "../Assets/Vert";

function Template({ entry, onDelete, onEdit }) {
  const Style = {
    position: "relative",
    width: "90%",
    height: "5vh",
    padding: "5px 10px",
    border: "1px solid #750D37",
    marginBottom: "10px",
    borderRadius: "5px",
    display: "grid",
    gridTemplateColumns: "auto 1fr auto", // Edit | Text | Remove
    alignItems: "center",
    backgroundColor: "black",
    gap: "10px",
  };

  const textStyle = {
    margin: "0",
    letterSpacing: "2px",
    color: "#00B4D8",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  };

  return (
    <div style={Style}>
      <Vert onClick={onEdit} color="#00B4D8" />
      <p style={textStyle}>{entry}</p>
      <Remove onClick={onDelete} color="#00B4D8"/>
    </div>
  );
}

export default Template;
