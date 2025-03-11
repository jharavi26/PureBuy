const express = require("express");
const cors = require("cors");
const stripe = require("stripe")("process.env.STRIPE_SECRET_KEY"); // Secret Key

const app = express();
app.use(cors());
app.use(express.json());

app.post("/api/create-payment-intent", async (req, res) => {
  try {
      const { amount } = req.body;
      const paymentIntent = await stripe.paymentIntents.create({
          amount,
          currency: "usd",
          payment_method_types: ["card"],
      });

      res.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
});


app.listen(5000, () => console.log("Server running on port 5000"));
