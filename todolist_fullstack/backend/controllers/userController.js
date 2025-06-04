const userService = require("../services/userService");

const signup = (req, res) => {
    try {
        const userData = req.body;
        const newUser = userService.signup(userData);

        const { password, ...userWithoutPassword } = newUser;

        res.status(201).json(userWithoutPassword);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const login = (req, res) => {
    try {
        const credentials = req.body;
        const result = userService.login(credentials);
        res.json(result);
    } catch (error) {
        res.status(401).json({ message: error.message });
    }
};

module.exports = {
    signup,
    login,
};
