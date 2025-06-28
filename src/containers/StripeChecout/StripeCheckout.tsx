// StripeCheckout.tsx
import React, { useEffect, useState } from "react";
import {
  useStripe,
  useElements,
  PaymentElement,
} from "@stripe/react-stripe-js";
import { getFunctions, httpsCallable } from "firebase/functions";
import { firebaseApp } from "../../firebase/firebaseApp";

export const StripeCheckout = ({ total }: { total: number }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [clientSecret, setClientSecret] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const appearance = { theme: "stripe" };
  const options = { clientSecret, appearance };

  useEffect(() => {
    const fetchClientSecret = async () => {
      const functions = getFunctions(firebaseApp);
      const createPaymentIntent = httpsCallable(functions, "createPaymentIntent");
      const response: any = await createPaymentIntent({ amount: total * 100 }); // Stripe expects cents
      setClientSecret(response.data.clientSecret);
    };

    fetchClientSecret();
  }, [total]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setLoading(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: window.location.origin + "/payment-success", // or your success page
      },
    });

    if (error) {
      if (error.type === "card_error" || error.type === "validation_error") {
        setMessage(error.message || "Payment failed");
      } else {
        setMessage("An unexpected error occurred.");
      }
    }

    setLoading(false);
  };

  return (
    <div>
      {clientSecret && (
        <form onSubmit={handleSubmit} id="payment-form">
          <PaymentElement options={{ layout: "accordion" }} />
          <button id="submit" disabled={loading || !stripe || !elements}>
            {loading ? "Processing..." : "Pay Now"}
          </button>
          {message && <div id="payment-message">{message}</div>}
        </form>
      )}
    </div>
  );
};
