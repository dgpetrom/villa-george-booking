import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Make sure you're using Routes and Route
import BookingForm from './BookingForm';
import CalendarPage from './CalendarPage'; // Assuming you have a Calendar page

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<BookingForm />} />
                <Route path="/calendar" element={<CalendarPage />} />
            </Routes>
        </Router>
    );
}

export default App;

