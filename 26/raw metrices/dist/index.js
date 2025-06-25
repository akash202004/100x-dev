"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const requestCounter_1 = require("./monitoring/requestCounter");
const prom_client_1 = __importDefault(require("prom-client"));
const app = (0, express_1.default)();
``;
app.use(requestCounter_1.histogramMetrices);
app.use(requestCounter_1.requestCouneterMiddleware);
app.use(requestCounter_1.requestGaugeCounter);
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
app.get("/metrics", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const metrics = yield prom_client_1.default.register.metrics();
    res.set('Content-Type', prom_client_1.default.register.contentType);
    res.end(metrics);
}));
app.listen(3000, () => {
    console.log("3000 running");
});
