import * as functions from "firebase-functions";
import express, { Request, Response } from "express";
import cors from "cors";
import Stripe from "stripe";

const STRIPE_SK_KEY = process.env.STRIPE_SK_KEY as string;

const stripe = new Stripe(STRIPE_SK_KEY);

// App configf
const app = express();

app.use(cors({ origin: true }));
app.use(express.json());

app.get("/", (_req: Request, res: Response) => {
  res.status(200).send("Hello World");
});

app.post("/temp", (_req: Request, res: Response) => {
  res.status(200).send("Hello World");
});

app.post("/payments/create", async (req: Request, res: Response) => {
  const total = Number(req.query.total);
  try {
    const paymentIntent = await stripe.paymentIntents.create(
      {
        amount: total,
        currency: "usd",
        payment_method_types: ["card"],
      },
      {
        stripeAccount: "acct_1ReyzMQRjf21HlUx",
      }
    );

    res.status(201).send({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    console.error("Stripe error:", error);
    res.status(500).send({ error: "Payment creation failed" });
  }
});

export const api = functions.https.onRequest(app);
