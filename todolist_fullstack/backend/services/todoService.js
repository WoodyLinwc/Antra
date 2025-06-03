const { todos } = require("../database/data");
const { v4: uuidv4 } = require("uuid");

class TodoService {
    // READ
    getAllTodos() {
        return todos;
    }

    getTodoById(id) {
        const todo = todos.find((todo) => todo.id === id);
        if (!todo) {
            throw new Error(`Todo with id ${id} not found`);
        }
        return todo;
    }

    // CREATE
    createTodo(todoData) {
        const { title, description } = todoData;
        const newTodo = {
            id: uuidv4(),
            title: title,
            description: description,
            completed: false,
        };

        todos.push(newTodo);
        return newTodo;
    }

    // UPDATE
    updateTodo(id, updates) {
        const todoToUpdate = todos.find((todo) => todo.id === id);

        if (!todoToUpdate) {
            throw new Error(`Todo with id ${id} not found`);
        }

        // update only the fields that are provided
        if (updates.title !== undefined) {
            todoToUpdate.title = updates.title;
        }
        if (updates.description !== undefined) {
            todoToUpdate.description = updates.description;
        }
        if (updates.completed !== undefined) {
            todoToUpdate.completed = updates.completed;
        }

        return todoToUpdate;
    }

    // DELETE
    deleteTodo(id) {
        // only change the local variableAdd commentMore actions
        // todos = todos.filter((todo) => todo.id !== id);

        const todoIndex = todos.findIndex((todo) => todo.id === id);
        if (todoIndex === -1) {
            throw new Error(`Todo with id ${id} not found`);
        }

        todos.splice(todoIndex, 1);
        return {
            success: true,
            message: `Todo with id ${id} deleted successfully`,
        };
    }
}

module.exports = new TodoService();
