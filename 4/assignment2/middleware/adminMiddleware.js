const jwt = require("jsonwebtoken");
const JWT_SECRET = require("../config").JWT_SECRET;

function adminMiddleware(req, res, next) {
    const token = req.headers.authorization;
    const words = token.split(" ");
    const jwtToken = words[1];
    const verifiedToken = jwt.verify(jwtToken, JWT_SECRET);
    if (verifiedToken.username) {
        next();
    } else {
        res.status(401).json({ message: "Unauthorized" });
    }
}

module.exports = adminMiddleware;