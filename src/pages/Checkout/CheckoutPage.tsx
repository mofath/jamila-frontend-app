import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { doc, setDoc } from "firebase/firestore";
import toast from "react-hot-toast";
import Stripe from "stripe";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  useStripe,
  useElements,
  CardNumberElement,
} from "@stripe/react-stripe-js";
// import CheckoutForm from "../../containers/StripeChecout/CheckoutForm";
import { useAuth } from "../../hook/useAuth";
import OrderSummary from "../../containers/OrderSummary/OrderSummary";
import { useCart } from "../../hook/useCart";
import { useSendEmailMutation } from "../../apis/mailerApi";
import { firebaseDb } from "../../firebase/firebaseApp";
import Button from "../../components/Button/Button";
import Spinner from "../../components/Spinner/Spinner";
import "./CheckoutPage.css";

const STRIPE_PK_KEY = process.env.REACT_APP_STRIPE_PK_KEY as string;
const STRIPE_SK_KEY = process.env.REACT_APP_STRIPE_SK_KEY as string;
const stripe = new Stripe(STRIPE_SK_KEY);

const CheckoutPage = () => {
  const [isCheckoutloading, setIsCheckoutLoading] = useState<boolean>(false);
  const { total, items, clearCart } = useCart();
  const stripePromise = loadStripe(STRIPE_PK_KEY);
  const { uid: userId, user } = useAuth();
  const navigate = useNavigate();

  const [sendEmail] = useSendEmailMutation();

  // const handleSubmit = async ({
  //   reactStripe,
  //   elements,
  //   e,
  // }: {
  //   reactStripe: ReturnType<typeof useStripe>;
  //   elements: ReturnType<typeof useElements>;
  //   e: React.FormEvent<HTMLFormElement>;
  // }) => {
  //   e.preventDefault();

  //   const paymentIntent = await stripe.paymentIntents.create(
  //     {
  //       amount: Number(total) * 100,
  //       currency: "usd",
  //       payment_method_types: ["card"],
  //     },
  //     {
  //       stripeAccount: "acct_1ReyzMQRjf21HlUx",
  //     }
  //   );

  //   const clientSecret = paymentIntent.client_secret?.replace(/^"|"$/g, "");
  //   if (!reactStripe || !elements) {
  //     toast.error("Stripe not loaded.");
  //     return;
  //   }

  //   const cardNumberElement = elements.getElement(CardNumberElement);
  //   if (!cardNumberElement) {
  //     toast.error("Card element missing.");
  //     return;
  //   }

  //   try {
  //     const { paymentIntent: confirmedIntent, error } =
  //       await reactStripe.confirmCardPayment(clientSecret!, {
  //         payment_method: {
  //           card: cardNumberElement,
  //           billing_details: { name: "jamila" },
  //         },
  //       });

  //     if (error || !confirmedIntent) {
  //       toast.error(error?.message || "Payment failed.");
  //       return;
  //     }

  //     const ref = doc(
  //       firebaseDb,
  //       "users",
  //       userId as string,
  //       "orders",
  //       confirmedIntent.id
  //     );

  //     await setDoc(ref, {
  //       amount: total,
  //       created: confirmedIntent.created,
  //     });

  //     const templateParams = {
  //       type: "order",
  //       payload: {
  //         user: {
  //           username: user.username,
  //           email: user.email,
  //           phone: user.phone,
  //         },
  //         items: items,
  //         total,
  //       },
  //     };

  //     await sendEmail(templateParams);

  //     toast.success("Success! Your order is placed");
  //     clearCart();
  //     setTimeout(() => {
  //       navigate("/menu", { replace: true });
  //     }, 300);
  //   } catch (err) {
  //     toast.error("Unexpected error during payment.");
  //   }
  // };

  const handleDirectCheckout = async () => {
    try {
      setIsCheckoutLoading(true);
      const ref = doc(
        firebaseDb,
        "users",
        userId,
        "orders",
        new Date().toISOString()
      );

      await setDoc(ref, {
        amount: total,
        created: new Date().toISOString(),
      });

      const templateParams = {
        type: "order",
        payload: {
          user: {
            username: user.username,
            email: user.email,
            phone: user.phone,
          },
          items: items,
          total,
        },
      };

      await sendEmail(templateParams);

      toast.success("Success! Your order is placed");
      clearCart();

      setTimeout(() => {
        navigate("/menu", { replace: true });
      }, 300);
      setIsCheckoutLoading(false);
    } catch (err) {
      toast.error("Unexpected error during payment.");
    }
  };

  return (
    <div className="page">
      {isCheckoutloading ? (
        <Spinner />
      ) : (
        <Elements stripe={stripePromise}>
          <div className="checkout-page">
            <div className="checkout-page__order-summary">
              <OrderSummary items={items} />
              <Button onClick={handleDirectCheckout}>Checkout</Button>
            </div>
            {/* <div className="checkout-page__form"> */}
            {/* {total ? <CheckoutForm onSubmit={handleSubmit} /> : <p>Loading...</p>} */}
            {/* </div> */}
          </div>
        </Elements>
      )}
    </div>
  );
};

export default CheckoutPage;
