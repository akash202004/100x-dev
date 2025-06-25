import express from "express";
import { histogramMetrices, requestCouneterMiddleware, requestGaugeCounter } from "./monitoring/requestCounter";
import client from "prom-client"

const app = express();
``

app.use(histogramMetrices);
app.use(requestCouneterMiddleware);
app.use(requestGaugeCounter);

app.get("/user", (req, res) => {
  res.json({
    name: "Akash",
  });
});

app.post("/user", (req, res) => {
  res.json({
    name: "Akash",
  });
});

app.get("/metrics", async (req, res) => {
    const metrics = await client.register.metrics();
    res.set('Content-Type', client.register.contentType);
    res.end(metrics);
})

app.listen(3000, () => {
  console.log("3000 running");
});
