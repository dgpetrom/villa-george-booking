import React from 'react';
import BookingForm from './BookingForm';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import BookingForm from './BookingForm'; // Import your booking form

function App() {
    return (
        <div className="App">
            <h1>Villa George Booking</h1>
            <BookingForm />
        </div>
        <Router>
            <Routes>
                <Route path="/" element={<BookingForm />} />
            </Routes>
        </Router>
    );
}

