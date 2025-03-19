require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const stripe = require("stripe")("sk_test_51R1T3lFPYHVofb34cZdHYveV0an0Ie4bXFRvsZXZbj10UKqn9rRQ9elDzKLhIohADgNBazAX7J4ghONeUvKF225P00t8FNhr4q")


app.use(cors());
app.use(express.json());

app.post("/api/create-checkout-session", async (req, res) => {
    try {
        const { products } = req.body;

        if (!products) {
            return res.status(400).json({ error: "Products array is required" });
        }

        const lineItems = products.map((product) => ({
            price_data: {
                currency: "inr",
                product_data: {
                    name: product.category,
                    images: [product.thumbnail]
                },
                unit_amount: Math.round(product.price * 100),
            },
            quantity: product.qty
        }));

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items: lineItems,
            mode: "payment",
            success_url: "http://localhost:3000/success",
            cancel_url: "http://localhost:3000/cancel",
        });

        res.json({ id: session.id });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});



app.listen(7000, () => console.log("Server running on port 7000"));
