import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CalendarPage from "./Pages/CalendarPage";
import JournalPage from "./Pages/JournalPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<CalendarPage />} />
        <Route path="/journal/:year/:month/:day" element={<JournalPage />} />
      </Routes>
    </Router>
  );
}

export default App;
