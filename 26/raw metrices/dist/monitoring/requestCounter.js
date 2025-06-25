"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.requestCouneterMiddleware = exports.requestGaugeCounter = void 0;
const prom_client_1 = __importDefault(require("prom-client"));
const requestCounter = new prom_client_1.default.Counter({
    name: "http_request_total",
    help: "Total number of HTTP requests",
    labelNames: ["methods", "route", "status_code"],
});
const requestGauge = new prom_client_1.default.Gauge({
    name: "active_req_counter",
    help: "number of active req."
});
const requestGaugeCounter = (req, res, next) => {
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
exports.requestGaugeCounter = requestGaugeCounter;
const requestCouneterMiddleware = (req, res, next) => {
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
exports.requestCouneterMiddleware = requestCouneterMiddleware;
