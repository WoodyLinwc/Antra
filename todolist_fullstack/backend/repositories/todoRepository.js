const { todos } = require("../database/data");
const { v4: uuidv4 } = require("uuid");

class TodoRepository {
    // READ
    findAll() {
        return todos;
    }

    findById(id) {
        return todos.find((todo) => todo.id === id);
    }

    // CREATE
    create(todoData) {
        const newTodo = {
            id: uuidv4(),
            ...todoData,
            completed:
                todoData.completed !== undefined ? todoData.completed : false,
        };

        todos.push(newTodo);
        return newTodo;
    }

    // UPDATE
    update(id, updates) {
        const todoIndex = todos.findIndex((todo) => todo.id === id);
        if (todoIndex === -1) {
            return null;
        }

        // create updated todo object
        const updatedTodo = { ...todos[todoIndex], ...updates };
        todos[todoIndex] = updatedTodo;

        return updatedTodo;
    }

    // DELETE
    delete(id) {
        // only change the local variableAdd commentMore actions
        // todos = todos.filter((todo) => todo.id !== id);
        const todoIndex = todos.findIndex((todo) => todo.id === id);
        if (todoIndex === -1) {
            return false;
        }

        todos.splice(todoIndex, 1);
        return true;
    }
}

module.exports = new TodoRepository();
