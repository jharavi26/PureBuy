require("dotenv").config();
const express = require("express");
const cors = require("cors");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const serverless = require("serverless-http");

const app = express();
app.use(cors());
app.use(express.json());

app.post("/api/create-checkout-session", async (req, res) => {
    try {
        const { products } = req.body;

        if (!products || !Array.isArray(products)) {
            return res.status(400).json({ error: "Products array is required" });
        }

        const lineItems = products.map((product) => ({
            price_data: {
                currency: "inr",
                product_data: {
                    name: product.category,
                    images: [product.thumbnail],
                },
                unit_amount: Math.round(product.price * 100),
            },
            quantity: product.qty,
        }));

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items: lineItems,
            mode: "payment",
            success_url: `${process.env.FRONTEND_URL}/success`,
            cancel_url: `${process.env.FRONTEND_URL}/cancel`,
        });

        res.json({ id: session.id });
    } catch (error) {
        console.error("Error creating Stripe session:", error);
        res.status(500).json({ error: error.message });
    }
});

// Export for Vercel
module.exports = app;
module.exports.handler = serverless(app);
