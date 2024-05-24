const express = require("express");
const router = express.Router();
const bodyParse = require("body-parser");
const midtransClient = require("midtrans-client");
require("dotenv").config();

const snap = new midtransClient.Snap({
  isProduction: false,
  serverKey: process.env.MIDTRANS_SERVER_KEY,
});

router.use(bodyParse.json());

router.post("/generate-snap-token", async (req, res) => {
  try {
    const { orderId, productName, totalPrice, quantity } = req.body;

    const parameter = {
      transaction_details: {
        order_id: orderId,
        gross_amount: totalPrice * quantity,
      },
      item_details: [
        {
          id: "item-id-1",
          price: totalPrice,
          quantity: quantity,
          name: productName,
        },
      ],
    };

    const snapToken = await snap.createTransactionToken(parameter);
    res.json({ snapToken });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
