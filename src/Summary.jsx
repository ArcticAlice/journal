import X from "./Assets/X";

function Summary({ onClose, summary }) {
  let recap = "";

  if (!summary || summary.length === 0) {
    recap = "No Data Found For This Month.";
  } else {
    recap = summary
      .map(
        (s) =>
          `Your consistency for the tag: ${(s.tag).toLowerCase()} was ${s.percent}%. For a total of ${s.count} days.`
      )
      .join(" ");
  }

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
    border: "1px solid #750D37",
  };

  const textStyle = {
    color: "#00B4D8",
  };

  return (
    <div style={style}>
      <X onClick={onClose} />
      <p style={textStyle}>{recap}</p>
    </div>
  );
}

export default Summary;
