import React from 'react';
import BookingForm from './BookingForm';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import PaymentForm from './PaymentForm';

const stripePromise = loadStripe('pk_test_51QBgQ1B1SHqUmRkqRJ8DtMcTvmjW1kSX8qyjpwBRVX2IJoPsWlWPAy8SofdhLGGU860h6qRCuotPwtLmTiTbYR4A00PLgUzjvM');  // Replace with your Stripe publishable key

export default App;

app.post('/webhook', express.raw({ type: 'application/json' }), (req, res) => {
    const sig = req.headers['stripe-signature'];

    try {
        const event = stripe.webhooks.constructEvent(req.body, sig, 'your-webhook-secret');

        if (event.type === 'payment_intent.succeeded') {
            const paymentIntent = event.data.object;
            console.log('Payment successful!', paymentIntent);
        }

        res.status(200).send('Received');
    } catch (err) {
        res.status(400).send(`Webhook Error: ${err.message}`);
    }
});

function App() {
    return (
        <div className="App">
            <h1>Villa George Booking</h1>
            <BookingForm />
        </div>
    );

    const handlePaymentSuccess = () => {
        // Redirect to booking confirmation page or show success message
        window.location.href = 'https://dgpetrom.github.io/VillaGeorge/booking.html';  // Redirect to your static booking page
    };

    return (
        <Elements stripe={stripePromise}>
            <PaymentForm amount={5000} currency="usd" onPaymentSuccess={handlePaymentSuccess} />
        </Elements>
    );
}

