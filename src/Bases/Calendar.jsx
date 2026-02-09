import Block from "./Block";
import Swirl from "../Assets/Swirl";
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
                <div style={styles.swirlBox}>
                    <Swirl onClick={openSummary} />
                </div>
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
        border: "solid, 1px #00B4D8",
        borderRadius: "10px",
        position: "absolute",
        display: "flex",
        justifyContent: "center",
    },
    weekday: {
        display: "grid",
        gridTemplateColumns: "repeat(7, 1fr)",
        width: "85%",
        height: "20%",
        color: "#00B4D8",
        textAlign: "center",
        position: "absolute",
        top: "13%",
        left: "50%",
        transform: 'translateX(-50%)',
    },
    container: {
        width: "85%",
        height: "80%",
        position: "absolute",
        bottom: "2%",
        display: "grid",
        gridTemplateColumns: "repeat(7, 1fr)",
    },
    text: {
        color: "#750D37",
        position: "absolute",
        fontSize: "25px",
        top: "50%",
        transform: "translateY(-50%)",
        left: "5%",
        display: "inline-block",
    },
    swirlBox: {
        position: "absolute",
        right: "5%",
        top: "50%",
        transform: "translateY(-50%)",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },

    yearBox: {
        position: "relative",
        width: "100%",
        height: "10%",
        borderBottom: "1px solid #00B4D8",
        boxSizing: "border-box",
    }
}
