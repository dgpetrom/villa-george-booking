import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate from React Router v6

const BookingForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        startDate: '',
        endDate: ''
    });
    const [status, setStatus] = useState('');
    const navigate = useNavigate(); // Initialize useNavigate for programmatic navigation

    // Handle form input changes
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();

        // Make a POST request to the backend API to submit booking data
        axios.post('https://villa-george-bookings.onrender.com/api/bookings', {
            start_date: formData.startDate,
            end_date: formData.endDate,
            name: formData.name,
            email: formData.email
        })
        .then(response => {
            setStatus('Booking successful!'); // Show success message

            // Redirect to the calendar page after successful booking
            navigate('/calendar'); // Use navigate to redirect
        })
        .catch(error => {
            setStatus('Error submitting booking.'); // Show error message
            console.error('Error:', error);
        });
    };

    return (
        <div className="booking-form">
            <h2>Book Your Stay at Villa George</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Name:</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Start Date:</label>
                    <input
                        type="date"
                        name="startDate"
                        value={formData.startDate}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>End Date:</label>
                    <input
                        type="date"
                        name="endDate"
                        value={formData.endDate}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit">Submit Booking</button>
            </form>
            {status && <p>{status}</p>} {/* Show status message */}
        </div>
    );
};

export default BookingForm;
