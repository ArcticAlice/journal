import { useState, useEffect } from "react";
import Calendar from "../Bases/Calendar";
import Right from "../Assets/Right";
import Left from "../Assets/Left";
import Summary from "../Bases/Summary";
import { getData } from "../utils/dataFunctions";

function CalendarPage({ onSelectDate }) {
    const month = new Date().getMonth();
    const year = new Date().getFullYear();
    const [currentMonth, setCurrentMonth] = useState(month);
    const [currentYear, setCurrentYear] = useState(year);
    const [showSummary, setShowSummary] = useState(false);
    const [summaryData, setSummaryData] = useState({});

    const handleLeftArrow = () => {
        setCurrentMonth(prevMonth => {
            if (prevMonth === 0) {
                setCurrentYear(prevYear => prevYear - 1);
                return 11;
            }
            return prevMonth - 1;
        });
    };

    const handleRightArrow = () => {
        setCurrentMonth(prevMonth => {
            if (prevMonth === 11) {
                setCurrentYear(prevYear => prevYear + 1);
                return 0;
            }
            return prevMonth + 1;
        });
    };

    useEffect(() => {
        const onKeyDown = (e) => {
            const el = e.target;
            const tag = el?.tagName;
            if (tag === "INPUT" || tag === "TEXTAREA" || el?.isContentEditable) return;

            if (e.key === "ArrowLeft") {
                e.preventDefault();
                handleLeftArrow();
            } else if (e.key === "ArrowRight") {
                e.preventDefault();
                handleRightArrow();
            }
        };

        window.addEventListener("keydown", onKeyDown);
        return () => window.removeEventListener("keydown", onKeyDown);
    }, []);


    const handleSelectDay = (day) => {
        onSelectDate(currentYear, currentMonth, day);
    };

    const monthSum = () => {
        const entries = getData(); // <-- use function
        const results = [];

        const totalDays = new Date(currentYear, currentMonth + 1, 0).getDate();

        for (let day = 1; day <= totalDays; day++) {
            const dateKey = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
            const dayEntries = entries[dateKey] || [];

            dayEntries.forEach(entry => {
                const tag = entry.taskTag?.toUpperCase();
                if (!tag) return;

                const existing = results.find(r => r.tag === tag);
                if (existing) {
                    existing.count++;
                } else {
                    results.push({ tag, count: 1, percent: 0 });
                }
            });
        }

        results.forEach(result => {
            result.percent = ((result.count / totalDays) * 100).toFixed(1);
        });

        setSummaryData(results);
        setShowSummary(true);
    };

    return (
        <div style={styles.page}>
            <div style={styles.calendarContainer}>
                <Calendar
                    year={currentYear}
                    month={currentMonth}
                    onSelectDay={handleSelectDay}
                    openSummary={monthSum}
                />
            </div>

            <div style={styles.arrowContainer}>
                <Left onClick={handleLeftArrow} />
                <Right onClick={handleRightArrow} />
            </div>

            {showSummary && <Summary summary={summaryData} onClose={() => setShowSummary(false)} />}
        </div>
    );
}

export default CalendarPage;


const styles = {
    page: {
        width: "100vw",
        height: "100vh",
        backgroundColor: "black",
    },
    arrowContainer: {
        position: "absolute",
        display: "flex",
        gap: ".5px",
        right: "3%",
        bottom: "6%",
    },
    calendarContainer: {
        position: "absolute",
        top: "50%",
        left: "5%",
        transform: "translateY(-50%)",
        width: "80%",
        height: "90%",
    }
}