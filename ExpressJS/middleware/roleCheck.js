// middleware/roleCheck.js
const roleCheck = (allowedRoles) => {
    return (req, res, next) => {
        // Auth middleware should run first to set req.user
        if (!req.user) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        if (!allowedRoles.includes(req.user.role)) {
            return res
                .status(403)
                .json({ message: "Forbidden: Insufficient privileges" });
        }

        next();
    };
};

module.exports = roleCheck;
