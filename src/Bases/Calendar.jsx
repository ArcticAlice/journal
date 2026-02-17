import Block from "./Block";
import { getData } from "../utils/dataFunctions";

function Calendar({ year, month, onSelectDay, openSummary }) {
    const firstDay = new Date(year, month, 1);
    const startWeekday = firstDay.getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const totalSlots = startWeekday + daysInMonth;
    const monthName = new Date(year, month).toLocaleString("default", { month: "long" });
    const entries = getData();

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

    return (
        <div style={styles.box}>

            <div style={styles.yearBox}>   
                <p style={styles.text}>{monthName} {year}</p>
            </div>

            <div style={styles.weekday}>
                {weekdays.map((day, index) => (
                    <p key={index}>{day}</p>
                ))}
            </div>

            <div style={styles.container}>
                {blocks}
            </div>
        </div>
    );
}

export default Calendar;

const styles = {
    box: {
        width: "100%",
        height: "100%",
        borderRadius: "10px",
        position: "absolute",
        display: "flex",
        justifyContent: "center",
        border: "solid, 1px #00B4D8",
        
    },
    weekday: {
        display: "grid",
        gridTemplateColumns: "repeat(7, 1fr)",
        width: "90%",
        height: "20%",
        color: "#00B4D8",
        textAlign: "center",
        position: "absolute",
        top: "11%",
        left: "51%",
        transform: 'translateX(-50%)',
    },
    container: {
        width: "90%",
        height: "80%",
        position: "absolute",
        bottom: "2%",
        display: "grid",
        gridTemplateColumns: "repeat(7, 1fr)",
        columnGap: "5px"
    },
    text: {
        color: "white",
        position: "absolute",
        fontSize: "25px",
        display: "inline-block",
    },
    yearBox: {
        position: "relative",
        width: "100%",
        height: "7%",
        borderTopRightRadius: "10px",
        borderTopLeftRadius: "10px",
        boxSizing: "border-box",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(90deg,rgba(117, 13, 55, 1) 0%, rgba(0, 180, 216, 1) 100%)",
    }
}
