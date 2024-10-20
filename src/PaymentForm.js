import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import axios from 'axios';

const PaymentForm = ({ amount, onPaymentSuccess }) => {
    const stripe = useStripe();
    const elements = useElements();
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        currency: 'usd' // default currency
    });
    const [errorMessage, setErrorMessage] = useState(null);
    const [processing, setProcessing] = useState(false);

    // Handle input changes
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setProcessing(true);

        if (!stripe || !elements) {
            return;
        }

        const cardElement = elements.getElement(CardElement);

        // Create a payment method and send it to the backend
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card: cardElement,
            billing_details: {
                name: `${formData.firstName} ${formData.lastName}`
            }
        });

        if (error) {
            setErrorMessage(error.message);
            setProcessing(false);
            return;
        }

        try {
            // Send the payment method and additional data to the backend
            const response = await axios.post('https://villa-george-bookings.onrender.com/api/bookings', {
                amount,
                currency: formData.currency,
                payment_method: paymentMethod.id,
                first_name: formData.firstName,
                last_name: formData.lastName
            });

            if (response.data.success) {
                onPaymentSuccess();
            } else {
                setErrorMessage('Payment failed. Please try again.');
            }
        } catch (err) {
            setErrorMessage('Error processing payment. Please try again.');
        }

        setProcessing(false);
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>First Name</label>
                <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <label>Last Name</label>
                <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <label>Currency</label>
                <select name="currency" value={formData.currency} onChange={handleChange} required>
                    <option value="usd">USD</option>
                    <option value="eur">EUR</option>
                    <option value="gbp">GBP</option>
                </select>
            </div>
            <CardElement />
            {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}
            <button type="submit" disabled={!stripe || processing}>
                {processing ? 'Processing...' : 'Pay'}
            </button>
        </form>
    );
};

export default PaymentForm;
