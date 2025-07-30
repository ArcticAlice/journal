function Number({ day }) {
  const Style = {
    width: "30%",
    height: "30%",
    position: "absolute",
    bottom: "0%",
    right: "0%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: "#00B4D8"
  };

  return <div style={Style}>{day}</div>;
}

function Block({ day, onClick }) {
  const Style = {
    width: "90%",
    height: "90%",
    borderRadius: "7%",
    border: "1px solid #750D37",
    position: "relative",
    cursor: "pointer",
    display: "inline-block",
    marginLeft: "15px",
    marginTop: "1px",
    marginBottom: "1px",
  };

  return (
    <div style={Style} onClick={onClick}>
      {day && <Number day={day} />}
    </div>
  );
}

export default Block;
