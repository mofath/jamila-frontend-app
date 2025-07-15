import { useState } from "react";
import {
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import Button from "../../components/Button/Button";
import "./CheckoutForm.css";

interface CheckoutFormProps {
  onSubmit: ({
    reactStripe,
    elements,
    e,
  }: {
    reactStripe: ReturnType<typeof useStripe>;
    elements: ReturnType<typeof useElements>;
    e: React.FormEvent<HTMLFormElement>;
  }) => void;
}

const CheckoutForm: React.FC<CheckoutFormProps> = ({ onSubmit }) => {
  const [error, setError] = useState<string | null>(null);
  const [processing, setProcessing] = useState<boolean>(false);
  const reactStripe = useStripe();
  const elements = useElements();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    setProcessing(true);
    onSubmit({ reactStripe, elements, e });
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
