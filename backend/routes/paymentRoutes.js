import express from "express";
import Stripe from "stripe";
import dotenv from "dotenv";

dotenv.config();
const router = express.Router();
const stripe = process.env.STRIPE_SECRET_KEY ? new Stripe(process.env.STRIPE_SECRET_KEY) : null;

router.post("/create-payment-intent", async (req, res) => {
  try {
    const { amount, currency = "usd" } = req.body;
    
    const stripeKey = process.env.STRIPE_SECRET_KEY;
    
    // Check if key is missing or is a placeholder
    if (!stripe || !stripeKey || stripeKey.includes("your_stripe_secret_key")) {
      console.log("Stripe key missing or invalid. Using MOCK mode.");
      return res.json({ 
        clientSecret: "mock_secret_key_for_testing",
        mock: true 
      });
    }

    // Create a PaymentIntent with the order amount and currency
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount,
      currency: currency,
      automatic_payment_methods: {
        enabled: true,
      },
    });

    res.send({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    console.error("Error creating payment intent:", error);
    res.status(500).json({ error: error.message });
  }
});

export default router;
