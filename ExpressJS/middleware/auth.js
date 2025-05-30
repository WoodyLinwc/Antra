const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
    // get token from header
    const token = req.header("x-auth-token");

    // check if no token
    if (!token) {
        return res
            .status(401)
            .json({ message: "No token, authorization denied" });
    }

    try {
        // verify token
        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET || "your_secret_key"
        );

        // add user from payload to request object
        req.user = decoded;
        next();
    } catch (err) {
        res.status(401).json({ message: "Token is not valid" });
    }
};

module.exports = auth;
