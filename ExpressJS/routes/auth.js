const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { users } = require("../data/users");

// register endpoint
router.post("/register", async (req, res) => {
    try {
        const { username, password, role = "user" } = req.body;

        // check if user already exists
        if (users.find((user) => user.username === username)) {
            return res.status(400).json({ message: "User already exists" });
        }

        // hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // create new user
        const newUser = {
            id: uuidv4(),
            username,
            password: hashedPassword,
            role,
        };

        // add to users array
        users.push(newUser);

        // create and return JWT token
        const token = jwt.sign(
            { id: newUser.id, username: newUser.username, role: newUser.role },
            process.env.JWT_SECRET || "your_secret_key",
            { expiresIn: "1h" }
        );

        res.status(201).json({ token });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: "Server error" });
    }
});

//login endpoint
router.post("/login", async (req, res) => {
    try {
        const { username, password } = req.body;

        // Find user
        const user = users.find((user) => user.username === username);
        if (!user) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        // Check password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const token = jwt.sign(
            { id: user.id, username: user.username, role: user.role },
            process.env.JWT_SECRET || "your_secret_key",
            { expiresIn: "1h" }
        );

        res.json({ token });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: "Server error" });
    }
});

// Get current user (protected route example)
router.get("/me", require("../middleware/auth"), (req, res) => {
    // Find user without returning password
    const user = users.find((user) => user.id === req.user.id);
    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }

    const { password, ...userWithoutPassword } = user;
    res.json(userWithoutPassword);
});

module.exports = router;
