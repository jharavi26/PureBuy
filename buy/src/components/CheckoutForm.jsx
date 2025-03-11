import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useState, useEffect } from "react";

const CheckoutForm = () => {
    const stripe = useStripe();
    const elements = useElements();
    const [clientSecret, setClientSecret] = useState("");
    const [message, setMessage] = useState("");

    // Fetch client secret from backend
    useEffect(() => {
        fetch("http://localhost:5000/api/create-payment-intent", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ amount: 5000 }) // Example: $50.00
        })
        .then(res => res.json())
        .then(data => setClientSecret(data.clientSecret))
        .catch(error => console.error("Error fetching client secret:", error));
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements || !clientSecret) return;

        const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: elements.getElement(CardElement),
            },
        });

        if (error) {
            setMessage(error.message);
        } else if (paymentIntent.status === "succeeded") {
            setMessage("Payment successful!");
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <CardElement />
            <button type="submit" disabled={!stripe || !clientSecret}>
                Pay
            </button>
            <p>{message}</p>
        </form>
    );
};

export default CheckoutForm;
