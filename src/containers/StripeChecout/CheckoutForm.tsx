import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { doc, setDoc } from "firebase/firestore";
import Stripe from "stripe";
import {
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { firebaseDb } from "../../firebase/firebaseApp";
import Button from "../../components/Button/Button";
import { ROUTES } from "../../constants/routes.constants";
import { useCart } from "../../hook/useCart";
import "./CheckoutForm.css";

const STRIPE_SK_KEY = process.env.REACT_APP_STRIPE_SK_KEY as string;

const stripe = new Stripe(STRIPE_SK_KEY as string);

interface CheckoutFormProps {
  total: string | number;
  userId?: string;
}

const CheckoutForm: React.FC<CheckoutFormProps> = ({ total, userId }) => {
  const [error, setError] = useState<string | null>(null);
  const [disabled, setDisabled] = useState<boolean>(true);
  const [succeeded, setSucceeded] = useState<boolean>(false);
  const [processing, setProcessing] = useState<boolean>(false);
  const reactStripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { clearCart } = useCart();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setProcessing(true);

    const paymentIntent = await stripe.paymentIntents.create(
      {
        amount: Number(total) * 100,
        currency: "usd",
        payment_method_types: ["card"],
      },
      {
        stripeAccount: "acct_1ReyzMQRjf21HlUx",
      }
    );

    // const response = await axios.post(`/payments/create?total=${total}`);

    const clientSecret = paymentIntent.client_secret;
    const parsedSecret = clientSecret?.replace(/^"|"$/g, "");

    if (!reactStripe || !elements) {
      setError("Stripe.js has not loaded yet. Please try again.");
      setProcessing(false);
      return;
    }

    const cardNumberElement = elements.getElement(CardNumberElement);

    if (!cardNumberElement) {
      setError("Card information is incomplete.");
      setProcessing(false);
      return;
    }

    try {
      const { paymentIntent, error } = await reactStripe.confirmCardPayment(
        parsedSecret as string,
        {
          payment_method: {
            card: cardNumberElement,
            billing_details: {
              name: "jamila",
            },
          },
        }
      );

      if (error || !paymentIntent) {
        setError(error?.message || "Payment failed.");
        setProcessing(false);
        return;
      }

      const ref = doc(
        firebaseDb,
        "users",
        userId as string,
        "orders",
        paymentIntent.id
      );

      await setDoc(ref, {
        amount: total,
        created: paymentIntent.created,
      });

      setSucceeded(true);
      setError(null);
      setProcessing(false);
      clearCart();
      toast.success("Success! Your order is placed");
      setTimeout(() => {
        navigate(ROUTES.MENU, { replace: true });
      }, 300);
    } catch (err) {
      setError("An unexpected error occurred.");
      setProcessing(false);
    }
  };

  return (
    <div className="checkout-form__section container mx-auto">
      <div className="checkout-form__container">
        <form className="checkout-form" onSubmit={handleSubmit}>
          {/* Card Number */}
          <div className="checkout-form__row">
            <label htmlFor="card-number" className="checkout-form__label">
              Card Number
            </label>
            <div className="checkout-form__input-wrapper">
              <CardNumberElement
                id="card-number"
                className="checkout-form__input"
                onChange={(e) => {
                  setDisabled(!e.complete);
                  setError(e.error ? e.error.message : null);
                }}
              />
            </div>
          </div>

          {/* Expiry and CVC */}
          <div className="checkout-form__row checkout-form__row--two-cols">
            <div className="checkout-form__col">
              <label htmlFor="card-expiry" className="checkout-form__label">
                Expiry Date
              </label>
              <div className="checkout-form__input-wrapper">
                <CardExpiryElement
                  id="card-expiry"
                  className="checkout-form__input"
                  onChange={(e) => {
                    setError(e.error ? e.error.message : null);
                  }}
                />
              </div>
            </div>
            <div className="checkout-form__col">
              <label htmlFor="card-cvc" className="checkout-form__label">
                CVC
              </label>
              <div className="checkout-form__input-wrapper">
                <CardCvcElement
                  id="card-cvc"
                  className="checkout-form__input"
                  onChange={(e) => {
                    setError(e.error ? e.error.message : null);
                  }}
                />
              </div>
            </div>
          </div>

          {/* Submit button */}
          <div className="checkout-form__actions">
            <Button
              type="submit"
              className="checkout-form__submit-button"
              // disabled={processing || disabled || succeeded}
            >
              <span>{processing ? <p>Processing…</p> : "Checkout"}</span>
            </Button>
            {error && <div className="checkout-form__message">{error}</div>}
          </div>
        </form>
      </div>
    </div>
  );
};

export default CheckoutForm;
