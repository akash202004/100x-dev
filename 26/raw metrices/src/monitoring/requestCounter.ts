import client from "prom-client";
import { NextFunction, Request, Response } from "express";

// making a new client with prom-client
const requestCounter = new client.Counter({
  name: "http_request_total",
  help: "Total number of HTTP requests",
  labelNames: ["method", "route", "status_code"],
});

// making a new gauge with prom-client
const requestGauge = new client.Gauge({
  name: "active_req_counter",
  help: "number of active req.",
});

const httphistogram = new client.Histogram({
  name: "Histogram_count",
  help: "store in bucket the time all req. are server to client",
  labelNames: ["method", "route", "status_code"],
  buckets: [0.1, 5, 10, 15, 50, 100, 300, 500, 1000, Infinity],
});

// count the total number of request in all rouets you have
// with status code and method
export const requestGaugeCounter = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const startTime = Date.now();
  requestGauge.inc();

  res.on("finish", () => {
    const endTime = Date.now();
    console.log(`Request took ${endTime - startTime}ms`);
    requestCounter.inc({
      method: req.method,
      route: req.route ? req.route.path : req.path,
      status_code: res.statusCode,
    });
    requestGauge.dec();
  });

  next();
};

// count total active req. measn a req which respond was not send yet
export const requestCouneterMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const startTime = Date.now();

  res.on("finish", () => {
    const endTime = Date.now();
    console.log(`Request took ${endTime - startTime}ms`);

    requestCounter.inc({
      method: req.method,
      route: req.route ? req.route.path : req.path,
    });
  });
  next();
};

// count the total time each request in handle and store them in buckets
export const histogramMetrices = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const startTime = Date.now();

  res.on("finish", () => {
    const endTime = Date.now();
    httphistogram.observe(
      {
        method: req.method,
        route: req.route ? req.route.path : req.path,
        status_code: res.statusCode,
      },
      endTime - startTime
    );
  });

  next();
};
