const { Router } = require("express");
const { v4: uuidv4 } = require("uuid");
const { todos } = require("../data/todos");

const router = Router();

// READ
router.get("/todos", (req, res) => {
    res.json(todos);
});

router.get("/todos/:id", (req, res) => {
    const { id } = req.params;
    const todo = todos.find((todo) => todo.id === id);
    if (!todo) {
        return res.status(404).json({ message: `Todo with ${id} not found` });
    }

    res.json(todo);
});

// CREATE
router.post("/todos", (req, res) => {
    const { title, description } = req.body;

    const newTodo = {
        id: uuidv4(),
        title: title,
        description: description || "",
        completed: false,
    };
    todos.push(newTodo);

    return res.status(201).json(newTodo);
});

// UPDATE
// PUT replaces the entire resource, so PATCH only update the filed you send
router.patch("/todos/:id", (req, res) => {
    const { id } = req.params;
    const { title, description, completed } = req.body;

    todoToUpdate = todos.find((todo) => todo.id === id);
    if (!todoToUpdate) {
        return res.status(404).json({ message: `Todo with ${id} not found` });
    }

    if (title !== undefined) {
        todoToUpdate.title = title;
    }

    if (description !== undefined) {
        todoToUpdate.description = description;
    }

    if (completed !== undefined) {
        todoToUpdate.completed = completed;
    }

    return res.json(todoToUpdate);
});

// DELETE
router.delete("/todos/:id", (req, res) => {
    const { id } = req.params;
    const todoToDelete = todos.find((todo) => todo.id === id);

    if (!todoToDelete) {
        return res.status(404).json({ message: `Todo with ${id} not found` });
    }

    // only change the local variable
    // todos = todos.filter((todo) => todo.id !== id);

    const todoIndex = todos.findIndex((todo) => todo.id === id);
    if (todoIndex !== -1) {
        todos.splice(todoIndex, 1);
    }

    res.status(200).json({
        message: `Todo with id ${id} deleted successfully!`,
    });
});

module.exports = router;
