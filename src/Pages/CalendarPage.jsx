import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import Calendar from "../Bases/Calendar";
import Right from "../Assets/Right";
import Left from "../Assets/Left";
import Summary from "../Bases/Summary";
import Swirl from "../Assets/Swirl";
import { getData } from "../utils/dataFunctions";

const calendarVariants = {
    enter: (dir) => ({ opacity: 0, x: dir * 22 }),
    center: { opacity: 1, x: 0 },
    exit:   (dir) => ({ opacity: 0, x: dir * -22 }),
};

function CalendarPage({ onSelectDate, monthIndex, setMonthIndex }) {
    const { currentYear, currentMonth } = useMemo(() => {
        const year = 1970 + Math.floor(monthIndex / 12);
        const month = ((monthIndex % 12) + 12) % 12; // keep in 0..11 even if monthIndex goes negative
        return { currentYear: year, currentMonth: month };
    }, [monthIndex]);

    const [showSummary, setShowSummary] = useState(false);
    const [summaryData, setSummaryData] = useState([]);
    const [direction, setDirection] = useState(0);

    const handleLeftArrow = () => {
        setDirection(-1);
        setMonthIndex(prev => prev - 1);
    };

    const handleRightArrow = () => {
        setDirection(1);
        setMonthIndex(prev => prev + 1);
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
        const entries = getData();
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
            <div style={styles.swirlContainer}>
                <Swirl onClick={monthSum} aria-label="View monthly summary" />
            </div>
            <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                    key={monthIndex}
                    style={styles.calendarContainer}
                    custom={direction}
                    variants={calendarVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.2, ease: [0.25, 1, 0.5, 1] }}
                >
                    <Calendar
                        year={currentYear}
                        month={currentMonth}
                        onSelectDay={handleSelectDay}
                        openSummary={monthSum}
                    />
                </motion.div>
            </AnimatePresence>

            <div style={styles.arrowContainer}>
                <Left onClick={handleLeftArrow} aria-label="Previous month" />
                <Right onClick={handleRightArrow} aria-label="Next month" />
            </div>

            <Summary show={showSummary} summary={summaryData} onClose={() => setShowSummary(false)} />
        </div>
    );
}

export default CalendarPage;


const styles = {
    page: {
        width: "100vw",
        height: "100vh",
        backgroundColor: "black",
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    arrowContainer: {
        position: "absolute",
        display: "flex",
        gap: ".5px",
        right: "3%",
        bottom: "6%",
    },
    calendarContainer: {
        width: "70vw",
        height: "85vh",
    },
    swirlContainer: {
        position: "absolute",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        left: "2.5%",
        top: "2.5%",
    }
}