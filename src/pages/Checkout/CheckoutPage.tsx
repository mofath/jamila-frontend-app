import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../../containers/StripeChecout/CheckoutForm";
import { useAuth } from "../../hook/useAuth";
import OrderSummary from "../../containers/OrderSummary/OrderSummary";
import { useCart } from "../../hook/useCart";
import "./CheckoutPage.css";

const STRIPE_PK_KEY = process.env.REACT_APP_STRIPE_PK_KEY as string;

const CheckoutPage = () => {
  const { total, items } = useCart();
  const stripePromise = loadStripe(STRIPE_PK_KEY);
  const { uid: userId } = useAuth();

  return (
    <Elements stripe={stripePromise}>
      <div className="checkout-page ">
        <div className="checkout-page__order-summary">
          <OrderSummary items={items} />
        </div>
        <div className="checkout-page__form">
          {total ? (
            <CheckoutForm
              total={Math.round(Number(total) * 100)}
              userId={userId}
            />
          ) : (
            <p>loading</p>
          )}
        </div>
      </div>
    </Elements>
  );
};

export default CheckoutPage;
