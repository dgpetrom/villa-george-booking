import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import axios from 'axios';

const PaymentForm = ({ amount, currency, onPaymentSuccess }) => {
    const stripe = useStripe();
    const elements = useElements();
    const [errorMessage, setErrorMessage] = useState(null);
    const [processing, setProcessing] = useState(false);

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
            card: cardElement
        });

        if (error) {
            setErrorMessage(error.message);
            setProcessing(false);
            return;
        }

        try {
            // Send the payment method to the backend to create and confirm payment intent
            const response = await axios.post('https://https://villa-george-bookings.onrender.com/api/payment', {
                amount,
                currency,
                payment_method: paymentMethod.id
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
            <CardElement />
            {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}
            <button type="submit" disabled={!stripe || processing}>
                {processing ? 'Processing...' : 'Pay'}
            </button>
        </form>
    );
};

export default PaymentForm;
