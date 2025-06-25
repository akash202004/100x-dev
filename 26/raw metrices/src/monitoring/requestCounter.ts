import client from "prom-client";
import { NextFunction, Request, Response } from "express";

const requestCounter = new client.Counter({
  name: "http_request_total",
  help: "Total number of HTTP requests",
  labelNames: ["methods", "route", "status_code"],
});

const requestGauge = new client.Gauge({
    name: "active_req_counter",
    help: "number of active req."
})

export const requestGaugeCounter = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const startTime = Date.now();
  requestGauge.inc();

  res.on('finish', () => {
    const endTime = Date.now();
    console.log(`Request took ${endTime - startTime}ms`);
    requestCounter.inc({
      methods: req.method,
      route: req.route ? req.route.path : req.path,
      status_code: res.statusCode
    });
    requestGauge.dec();
  });

  next();
};

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
      methods: req.method,
      route: req.route ? req.route.path : req.path,
      status_code: res.statusCode,
    });
  });
  next();
};
