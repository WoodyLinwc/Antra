const todoRepository = require("../repositories/todoRepository");

class TodoService {
    // READ
    getAllTodos() {
        return todoRepository.findAll();
    }

    getTodoById(id) {
        const todo = todoRepository.findById(id);
        if (!todo) {
            throw new Error(`Todo with id ${id} not found`);
        }
        return todo;
    }

    // CREATE
    createTodo(todoData) {
        // validate required fields
        if (!todoData.title) {
            throw new Error("Title is required");
        }

        return todoRepository.create(todoData);
    }

    // UPDATE
    updateTodo(id, updates) {
        const updatedTodo = todoRepository.update(id, updates);
        if (!updatedTodo) {
            throw new Error(`Todo with id ${id} not found`);
        }

        return updatedTodo;
    }

    // DELETE
    deleteTodo(id) {
        const result = todoRepository.delete(id);
        if (!result) {
            throw new Error(`Todo with id ${id} not found`);
        }
        return {
            success: true,
            message: `Todo with id ${id} deleted successfully`,
        };
    }
}

module.exports = new TodoService();
