import { useNavigate } from "react-router-dom";
import Block from "./Block";

function Calendar({ year, month }) {
  const navigate = useNavigate();

  const firstDay = new Date(year, month, 1);
  const startWeekday = firstDay.getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const totalSlots = startWeekday + daysInMonth;
  const monthName = new Date(year, month).toLocaleString("default", { month: "long" });

  const handleDayClick = (day) => {
    navigate(`/journal/${year}/${month}/${day}`);
  };

  const blocks = Array.from({ length: totalSlots }).map((_, index) => {
    const day = index >= startWeekday ? index - startWeekday + 1 : null;
    return (
      <Block
        key={index}
        day={day}
        onClick={() => day && handleDayClick(day)}
      />
    );
  });

  const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const boxStyle = {
    width: "70%",
    height: "75%",
    border: "solid, 1px #00B4D8",
    borderRadius: "10px",
    left: '50%',
    transform: 'translateX(-50%)',
    position: "absolute",
    bottom: "1%",
    display: "flex",
    justifyContent: "center",
  }

  const weekdayStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(7, 1fr)",
    width: "85%",
    height: "20%",
    color: "#00B4D8",
    textAlign: "center",
    position: "absolute",
    top: "11%",
    left: "51%",
    transform: 'translateX(-50%)',
  };

  const containerStyle = {
    width: "85%",
    height: "80%",
    position: "absolute",
    bottom: "2%",
    display: "grid",
    gridTemplateColumns: "repeat(7, 1fr)",
  };

  const textStyle = {
    color: "#750D37",
    size: "5%",
    position: "absolute",
    top: "1%",
    fontSize: "25px"
  }

  return (
    <div style={boxStyle}>
      <p style={textStyle}>{monthName} {year}</p>
      <div style={weekdayStyle}>
        {weekdays.map((day, index) => (
          <p key={index}>{day}</p>
        ))}
      </div>
      <div style={containerStyle}>
        {blocks}
      </div>
    </div>
  );
}

export default Calendar;
