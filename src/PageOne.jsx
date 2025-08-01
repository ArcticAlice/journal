import { useState } from "react";
import Calendar from "./Bases/Calendar";
import Right from "./Assets/Right";
import Left from "./Assets/Left";
import Swirl from "./Assets/Swirl"
import Summary from "./Summary";

function PageOne() {
    const [currentMonth, setCurrentMonth] = useState(7); // July (0-based)
    const [currentYear, setCurrentYear] = useState(2025);
    const [showSummary, setShowSummary] = useState(false);
    const [summaryData, setSummaryData] = useState({});

    const handleLeftArrow = () => {
        if (currentMonth === 0) {
            setCurrentMonth(11);
            setCurrentYear((prevYear) => prevYear - 1);
        } else {
            setCurrentMonth((prevMonth) => prevMonth - 1);
        }
    };

    const handleRightArrow = () => {
        if (currentMonth === 11) {
            setCurrentMonth(0);
            setCurrentYear((prevYear) => prevYear + 1);
        } else {
            setCurrentMonth((prevMonth) => prevMonth + 1);
        }
    };

    const monthSum = () => {
        const saved = localStorage.getItem("entries");
        const results = []; // Use array to store tag stats

        if (!saved) {
            console.log("No journal entries found.");
            setSummaryData([]);
            setShowSummary(true);
            return;
        }

        const entries = JSON.parse(saved);
        const totalDays = new Date(currentYear, currentMonth + 1, 0).getDate();

        for (let day = 1; day <= totalDays; day++) {
            const dateKey = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
            const dayEntries = entries[dateKey] || [];

            dayEntries.forEach((entry) => {
                const tag = entry.taskTag?.toUpperCase();
                if (!tag) return;

                const existing = results.find((r) => r.tag === tag);
                if (existing) {
                    existing.count++;
                } else {
                    results.push({ tag, count: 1, percent: 0 });
                }
            });
        }

        results.forEach((result) => {
            result.percent = ((result.count / totalDays) * 100).toFixed(1);
        });

        setSummaryData(results);
        setShowSummary(true);
    };


    const pageStyle = {
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        backgroundColor: "black",
        padding: "2rem",
        boxSizing: "border-box",
    };

    const arrowContainerStyle = {
        position: "absolute",
        display: "flex",
        gap: ".5px",
        right: "2.5%",
        bottom: "2.5%",
    };

    return (
        <div style={pageStyle}>

            <Swirl bottom="5%" right="2.5%" onClick={monthSum} />

            <div style={arrowContainerStyle}>
                <Left onClick={handleLeftArrow} />
                <Right onClick={handleRightArrow} />
            </div>

            {showSummary && (
                <Summary summary={summaryData} onClose={() => setShowSummary(false)} />
            )}

            <Calendar year={currentYear} month={currentMonth} />
        </div>
    );
}

export default PageOne;
