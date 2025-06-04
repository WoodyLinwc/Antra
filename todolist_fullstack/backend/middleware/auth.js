const jwt = require("jsonwebtoken");
require("dotenv").config();

const JWT_SECRET = process.env.JWT_SECRET || "default-secret-key";

const authMiddleware = (req, res, next) => {
    // get token from header
    const token = req.header("Authorization")?.replace("Bearer", "");

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).json({ message: "Token is not valid" });
    }
};

module.exports = authMiddleware;
