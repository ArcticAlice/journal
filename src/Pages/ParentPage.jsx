import { useState } from "react";
import CalendarPage from "./CalendarPage";
import JournalPage from "./JournalPage";

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
        <>
            {view === "calendar" && (
                <CalendarPage
                    onSelectDate={handleSelectDate}
                    monthIndex={monthIndex}
                    setMonthIndex={setMonthIndex}
                />
            )}

            {view === "journal" && (
                <JournalPage
                    year={selectedDate.year}
                    month={selectedDate.month}
                    day={selectedDate.day}
                    onBack={handleBackToCalendar}
                />
            )}
        </>
    );
}

export default ParentPage;
