import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import CalendarPage from "./CalendarPage";
import JournalPage from "./JournalPage";

const pageVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit:    { opacity: 0 },
};
const pageTransition = { duration: 0.18, ease: "easeInOut" };

function ParentPage() {
    const [selectedDate, setSelectedDate] = useState({
        year: null,
        month: null,
        day: null,
    });

    // Persist the currently viewed calendar month even when CalendarPage unmounts
    const now = new Date();
    const initialMonthIndex = (now.getFullYear() - 1970) * 12 + now.getMonth();
    const [monthIndex, setMonthIndex] = useState(initialMonthIndex);

    const [view, setView] = useState("calendar");
    // "calendar" or "journal"

    const handleSelectDate = (year, month, day) => {
        setSelectedDate({ year, month, day });
        setView("journal");
    };

    const handleBackToCalendar = () => {
        setView("calendar");
    };

    return (
        <AnimatePresence mode="wait">
            {view === "calendar" && (
                <motion.div
                    key="calendar"
                    variants={pageVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    transition={pageTransition}
                >
                    <CalendarPage
                        onSelectDate={handleSelectDate}
                        monthIndex={monthIndex}
                        setMonthIndex={setMonthIndex}
                    />
                </motion.div>
            )}

            {view === "journal" && (
                <motion.div
                    key="journal"
                    variants={pageVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    transition={pageTransition}
                >
                    <JournalPage
                        year={selectedDate.year}
                        month={selectedDate.month}
                        day={selectedDate.day}
                        onBack={handleBackToCalendar}
                    />
                </motion.div>
            )}
        </AnimatePresence>
    );
}

export default ParentPage;
