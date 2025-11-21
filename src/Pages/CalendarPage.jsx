import { useState } from "react";
import Calendar from "../Bases/Calendar";
import Right from "../Assets/Right";
import Left from "../Assets/Left";
import Swirl from "../Assets/Swirl";
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
        if (currentMonth === 0) {
            setCurrentMonth(11);
            setCurrentYear(prevYear => prevYear - 1);
        } else {
            setCurrentMonth(prevMonth => prevMonth - 1);
        }
    };

    const handleRightArrow = () => {
        if (currentMonth === 11) {
            setCurrentMonth(0);
            setCurrentYear(prevYear => prevYear + 1);
        } else {
            setCurrentMonth(prevMonth => prevMonth + 1);
        }
    };

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

    const pageStyle = {
        width: "100vw",
        height: "100vh",
        backgroundColor: "black",
    };

    const arrowContainerStyle = {
        position: "absolute",
        display: "flex",
        gap: ".5px",
        right: "2.5%",
        bottom: "2.5%",
    };

    const swirlContainerStyle = {
        position: "absolute",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        left: "2.5%",
        top: "2.5%",
    };

    const calendarContainerStyle = {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: "70%",
        height: "85%",
    };

    return (
        <div style={pageStyle}>
            <div style={swirlContainerStyle}>
                <Swirl onClick={monthSum} />
            </div>

            <div style={calendarContainerStyle}>
                <Calendar
                    year={currentYear}
                    month={currentMonth}
                    onSelectDay={handleSelectDay}
                />
            </div>

            <div style={arrowContainerStyle}>
                <Left onClick={handleLeftArrow} />
                <Right onClick={handleRightArrow} />
            </div>

            {showSummary && <Summary summary={summaryData} onClose={() => setShowSummary(false)} />}
        </div>
    );
}

export default CalendarPage;