import Block from "./Block";
import { getData } from "../utils/dataFunctions";

function Calendar({ year, month, onSelectDay }) {

  const firstDay = new Date(year, month, 1);
  const startWeekday = firstDay.getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const totalSlots = startWeekday + daysInMonth;
  const monthName = new Date(year, month).toLocaleString("default", { month: "long" });
  const entries = getData();

  const handleDayClick = (day) => {
    onSelectDay(day);  // <-- new behavior
  };

  const blocks = Array.from({ length: totalSlots }).map((_, index) => {
    const day = index >= startWeekday ? index - startWeekday + 1 : null;

    let fill = false;
    let circle = false;
    if (day) {
      const key = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
      fill = Boolean(entries[key]?.length);
      circle = true
    }

    return (
      <Block
        key={index}
        day={day}
        fill={fill}
        circle={circle}
        onClick={() => day && onSelectDay(day)}
      />
    );
  });

  const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const boxStyle = {
    width: "100%",
    height: "100%",
    border: "solid, 1px #00B4D8",
    borderRadius: "10px",
    position: "absolute",
    display: "flex",
    justifyContent: "center",
  };

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
    width: "100%",
    height: "7%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "25px",
    borderBottom: "1px solid #00B4D8",
  };

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
