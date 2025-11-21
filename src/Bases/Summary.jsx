import X from "../Assets/X";

function Summary({ onClose, summary }) {
  const style = {
    position: "absolute",
    width: "800px",
    height: "350px",
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
    border: "1px solid #00B4D8",
  };

  const textStyle = {
    color: "white",
    flexGrow: 1,
    resize: "none",
    width: "auto",
    height: "auto",
    margin: "15px",
    boxSizing: "border-box",
    border: "none",
    outline: "none",
    backgroundColor: "black",
    fontWeight: "100"
  };

  return (
    <div style={style}>
      <X onClick={onClose} />
      {!summary || summary.length === 0 ? (
        <p style={textStyle}>No Data Found For This Month.</p>
      ) : (
        <ul style={textStyle}>
          {summary.map((s, index) => (
            <li key={index}>
              Your consistency for the tag: {s.tag.toLowerCase()} was {s.percent}%. For a total of {s.count} days.
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Summary;
