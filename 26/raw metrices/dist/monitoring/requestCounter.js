"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.histogramMetrices = exports.requestCouneterMiddleware = exports.requestGaugeCounter = void 0;
const prom_client_1 = __importDefault(require("prom-client"));
// making a new client with prom-client
const requestCounter = new prom_client_1.default.Counter({
    name: "http_request_total",
    help: "Total number of HTTP requests",
    labelNames: ["method", "route", "status_code"],
});
// making a new gauge with prom-client
const requestGauge = new prom_client_1.default.Gauge({
    name: "active_req_counter",
    help: "number of active req.",
});
const httphistogram = new prom_client_1.default.Histogram({
    name: "Histogram_count",
    help: "store in bucket the time all req. are server to client",
    labelNames: ["method", "route", "status_code"],
    buckets: [0.1, 5, 10, 15, 50, 100, 300, 500, 1000, Infinity],
});
// count the total number of request in all rouets you have
// with status code and method
const requestGaugeCounter = (req, res, next) => {
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
exports.requestGaugeCounter = requestGaugeCounter;
// count total active req. measn a req which respond was not send yet
const requestCouneterMiddleware = (req, res, next) => {
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
exports.requestCouneterMiddleware = requestCouneterMiddleware;
// count the total time each request in handle and store them in buckets
const histogramMetrices = (req, res, next) => {
    const startTime = Date.now();
    res.on("finish", () => {
        const endTime = Date.now();
        httphistogram.observe({
            method: req.method,
            route: req.route ? req.route.path : req.path,
            status_code: res.statusCode,
        }, endTime - startTime);
    });
    next();
};
exports.histogramMetrices = histogramMetrices;
