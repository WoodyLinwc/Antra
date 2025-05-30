const { Router } = require("express");
const auth = require("../middleware/auth");
const roleCheck = require("../middleware/roleCheck");
const { todos } = require("../data/todos");

const router = Router();

// Regular user dashboard - accessible to all authenticated users
router.get("/dashboard", auth, (req, res) => {
    // Filter todos created by this user
    const userTodos = todos.filter((todo) => todo.createdBy === req.user.id);

    res.json({
        user: {
            username: req.user.username,
            role: req.user.role,
        },
        todos: userTodos,
    });
});

// Admin dashboard - only for admins
router.get("/admin-dashboard", auth, roleCheck(["admin"]), (req, res) => {
    res.json({
        message: "Welcome to the Admin Dashboard",
        totalTodos: todos.length,
        todos: todos,
    });
});

module.exports = router;
