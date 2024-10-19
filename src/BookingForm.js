import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom'; // If using React Router for navigation

const BookingForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        startDate: '',
        endDate: ''
    });
    const [status, setStatus] = useState('');
    const history = useHistory(); // For navigation after booking

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        axios.post('https://villa-george-backend.onrender.com/api/bookings', {
            start_date: formData.startDate,
            end_date: formData.endDate,
            name: formData.name,
            email: formData.email
        })
        .then(response => {
            setStatus('Booking successful!');

            // Redirect to the Villa George calendar page after booking
            history.push('/calendar'); // Assuming "/calendar" is your calendar page route
        })
        .catch(error => {
            setStatus('Error submitting booking.');
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
            {status && <p>{status}</p>}
        </div>
    );
};

export default BookingForm;
