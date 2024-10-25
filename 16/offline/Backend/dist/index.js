"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    credentials: true,
    origin: "http://localhost:5173",
}));
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.json());
app.post("/signup", (req, res) => {
    const { email, password } = req.body;
    const token = jsonwebtoken_1.default.sign({
        email,
    }, "secret");
    res.cookie("token", token);
    res.json({ message: "Signed up", token: token });
});
app.post("/signin", (req, res) => {
    const { email, password } = req.body;
    const token = jsonwebtoken_1.default.sign({
        email,
    }, "secret");
    res.cookie("token", token);
    res.json({ message: "Signed up", token: token });
});
app.get("/user", (req, res) => {
    const token = req.cookies.token;
    const payload = jsonwebtoken_1.default.verify(token, "secret");
    res.json({ email: payload.email });
});
app.post("/logout", (req, res) => {
    res.clearCookie("token");
    res.json("Logged out");
});
const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
