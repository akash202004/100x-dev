const userSchema = require('../models/userModel');
const jwt = require('jsonwebtoken');

const authMiddleware = async (req, res, next) => {
    try {
        const authHeader = req.headers['authorization'];
        if (!authHeader) {
            return res.status(401).json({ message: 'Unauthorized Access!!' });
        }
        const token = authHeader.split(' ')[1];
        if (!token) {
            return res.status(401).json({ message: 'Unauthorized Access!!' });
        }
        const descodeToken = jwt.verify(token, process.env.JWT_SECRET);
        const user = await userSchema.findOne({ email: descodeToken.email });
        if (!user) {
            return res.status(401).json({ message: 'Unauthorized Access!!' });
        }
        req.user = user;
        next();

    } catch (error) {
        console.log(error);
        res.status(404).json({ message: `Auth Middleware error ${error}` });
    }
}

module.exports = authMiddleware;