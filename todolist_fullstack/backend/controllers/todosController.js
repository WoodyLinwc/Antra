const { todos } = require("../database/data");
const { v4: uuidv4 } = require("uuid");
const todoService = require("../services/todoService");

// READ
const getAllTodos = (req, res) => {
    // res.json(todos);
    try {
        const allTodos = todoService.getAllTodos();
        res.json(allTodos);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getTodo = (req, res) => {
    // const { id } = req.params;
    // const todo = todos.find((todo) => todo.id === id);
    // if (!todo) {
    //     return res.status(404).json({ message: `Todo with ${id} not found` });
    // }

    // res.json(todo);
    try {
        const { id } = req.params;
        const todo = todoService.getTodoById(id);
        res.json(todo);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

// CREATE
const createTodo = (req, res) => {
    try {
        const newTodo = todoService.createTodo(req.body);
        res.status(201).json(newTodo);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// UPDATE
const updateTodo = (req, res) => {
    try {
        const { id } = req.params;
        const updatedTodo = todoService.updateTodo(id, req.body);
        res.json(updatedTodo);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

// DELETE
const deleteTodo = (req, res) => {
    try {
        const { id } = req.params;
        const result = todoService.deleteTodo(id);
        res.status(200).json(result);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

module.exports = {
    getAllTodos,
    getTodo,
    createTodo,
    updateTodo,
    deleteTodo,
};
