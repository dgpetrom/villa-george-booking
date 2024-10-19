import React, { useState } from 'react';
import axios from 'axios';

const BookingForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        startDate: '',
        endDate: ''
    });
    const [status, setStatus] = useState('');

    // Handle form data changes
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        axios.post('https://villa-george-bookings.onrender.com/api/bookings', {
            start_date: formData.startDate,
            end_date: formData.endDate,
            name: formData.name,
            email: formData.email
        })
        .then(response => {
            setStatus('Booking successful!');

            // Redirect to the static booking page after successful booking
            setTimeout(() => {
                window.location.href = 'https://dgpetrom.github.io/VillaGeorge/booking.html';
            }, 2000); // Delay to show success message before redirecting
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
