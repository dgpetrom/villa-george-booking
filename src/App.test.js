import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import BookingForm from './BookingForm';
import CalendarPage from './CalendarPage';
import './App.css'; // CSS for styling

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<BookingForm />} />
          <Route path="/calendar" element={<CalendarPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
