import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { StripeCheckout } from "../../containers/StripeChecout/StripeCheckout";

const stripePromise = loadStripe("pk_test_XXXXXXXXXXXXXXXXXXXXXX");

export default function CheckoutPage() {
  const total = 23.5; // 🧮 Your calculated cart total

  return (
    <Elements stripe={stripePromise}>
      <StripeCheckout total={total} />
    </Elements>
  );
}