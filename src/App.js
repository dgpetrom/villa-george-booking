import React from 'react';
import BookingForm from './BookingForm';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import PaymentForm from './PaymentForm';

const stripePromise = loadStripe('pk_test_51QBgQ1B1SHqUmRkqRJ8DtMcTvmjW1kSX8qyjpwBRVX2IJoPsWlWPAy8SofdhLGGU860h6qRCuotPwtLmTiTbYR4A00PLgUzjvM');  // Replace with your Stripe publishable key

function App() {
    const handlePaymentSuccess = () => {
        window.location.href = 'https://dgpetrom.github.io/VillaGeorge/booking.html';  // Redirect to the booking page after successful payment
    };

    return (
        <div className="App">
            <h1>Villa George Booking</h1>
            <Elements stripe={stripePromise}>
                <PaymentForm amount={5000} currency="gbp" onPaymentSuccess={handlePaymentSuccess} />
            </Elements>
        </div>
    );
}

export default App;

