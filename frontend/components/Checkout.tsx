import styled from "styled-components";
import { FormEvent, ReactElement, useState } from "react";
import { loadStripe, PaymentMethod, StripeError } from "@stripe/stripe-js";
import {
  CardElement,
  Elements,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import nProgress from "nprogress";
import SickButton from "./styles/SickButton";

const CheckoutFormStyles = styled.form`
  box-shadow: 0 1px 2px 3px rgba(0, 0, 0, 0.04);
  border: 1px solid rgba(0, 0, 0, 0.06);
  border-radius: 5px;
  padding: 1rem;
  display: grid;
  grid-gap: 1rem;
`;

function CheckoutForm(): ReactElement {
  const [error, setError] = useState<StripeError>();
  const [loading, setLoading] = useState(false);
  const stripe = useStripe();
  const elements = useElements();

  async function handleSubmit(e: FormEvent): Promise<void> {
    e.preventDefault();
    setLoading(true);
    // Start the page transition
    nProgress.start();
    // Create the payment method via Stripe and get the token

    const cardElement = elements?.getElement(CardElement);
    if (!stripe) {
      throw new Error("Stripe was not initialized");
    }
    if (!cardElement) {
      throw new Error("no elements found via Stripe");
    }
    let paymentMethod: PaymentMethod;
    try {
      const response = await stripe.createPaymentMethod({
        type: "card",
        card: cardElement,
      });
      if (response.error !== undefined) {
        throw response.error;
      }
      paymentMethod = response.paymentMethod;
    } catch (stripeError) {
      setError(stripeError);
    }
    // Handle any errors from Stripe
    // Send the token to our keystone server via custom mutation
    // Change the page to view the order
    // Close the cart

    // Turn the loader off
    setLoading(false);
    nProgress.done();
  }

  return (
    <CheckoutFormStyles onSubmit={handleSubmit}>
      {error && <p style={{ fontSize: 12 }}>{error.message}</p>}
      <CardElement />
      <SickButton>Check Out Now</SickButton>
    </CheckoutFormStyles>
  );
}

if (!process.env.NEXT_PUBLIC_STRIPE_KEY) {
  throw new Error("Define NEXT_PUBLIC_STRIPE_KEY variable");
}

const stripeLib = loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY);

export default function Checkout(): ReactElement {
  return (
    <Elements stripe={stripeLib}>
      <CheckoutForm />
    </Elements>
  );
}
