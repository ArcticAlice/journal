import { useState } from "react";
import CalendarPage from "./CalendarPage";
import JournalPage from "./JournalPage";

function ParentPage() {

    const [selectedDate, setSelectedDate] = useState({
        year: null,
        month: null,
        day: null,
    });

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
