import express from "express";
import { orderInputSchema } from "./types";
import { orderbook, bookWithQuantity } from "./orderbook";

const app = express();
const BASE_ASSET = "BTC";
const QUOTE_ASSET = "USDT";

app.use(express.json());

app.post("/api/v1/order", (req, res) => {
  const order = orderInputSchema.safeParse(req.body);
  if (!order.success) {
    res.status(400).json({
      message: "Invalid order",
      error: order.error,
    });
    return;
  }

  const { baseAsset, quoteAsset, price, quantity, side, kind } = order.data;
  const orderId = getOrderId();

  if(baseAsset !== BASE_ASSET || quoteAsset !== QUOTE_ASSET) {
    res.status(400).json({
      message: "Invalid order",
      error: "Invalid asset pair",
    });
    return;
  }

//   const {executedQty, fills} = fillOrder(orderId, price, quantity, side, kind);
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

function getOrderId() {
  const id =
    Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15);
  return id;
}

function fillOrder(){}
