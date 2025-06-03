const { todos } = require("../database/data");
const { v4: uuidv4 } = require("uuid");

// READ
const getAllTodos = (req, res) => {
    res.json(todos);
};

const getTodo = (req, res) => {
    const { id } = req.params;
    const todo = todos.find((todo) => todo.id === id);
    if (!todo) {
        return res.status(404).json({ message: `Todo with ${id} not found` });
    }

    res.json(todo);
};

// CREATE
const createTodo = (req, res) => {
    const { title, description } = req.body;

    const newTodo = {
        id: uuidv4(),
        title: title,
        description: description,
        completed: false,
    };

    todos.push(newTodo);

    res.status(201).json(newTodo);
};

// UPDATE
const updateTodo = (req, res) => {
    const { id } = req.params;
    const { title, description, completed } = req.body;

    const todoToUpdate = todos.find((todo) => todo.id === id);
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

    res.json(todoToUpdate);
};

// DELETE
const deleteTodo = (req, res) => {
    const { id } = req.params;
    const todoToDelete = todos.find((todo) => todo.id === id);

    if (!todoToDelete) {
        return res.status(404).json({ message: `Todo with ${id} not found` });
    }

    // only change the local variableAdd commentMore actions
    // todos = todos.filter((todo) => todo.id !== id);

    const todoIndex = todos.findIndex((todo) => todo.id === id);
    if (todoIndex !== -1) {
        todos.splice(todoIndex, 1);
    }

    res.status(200).json({
        message: `Todo with id ${id} deleted successfully`,
    });
};

module.exports = {
    getAllTodos,
    getTodo,
    createTodo,
    updateTodo,
    deleteTodo,
};
