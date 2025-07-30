import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PageOne from "./PageOne";
import JournalPage from "./PageTwo";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PageOne />} />
        <Route path="/journal/:year/:month/:day" element={<JournalPage />} />
      </Routes>
    </Router>
  );
}

export default App;
