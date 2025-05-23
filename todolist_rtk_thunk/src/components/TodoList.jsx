import React, { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./TodoList.css";
import TodoItem from "./TodoItem";
import {
    fetchTodosAsync,
    addTodoAsync,
    deleteTodoAsync,
    updateTodoAsync,
    editTodoContentAsync,
} from "../store/todoSlice";

const TodoList = () => {
    const [inputValue, setInputValue] = useState("");
    const dispatch = useDispatch();

    // get data from Redux store
    const { items: todos, status, error } = useSelector((state) => state.todos);

    // derived states
    const pendingTodos = todos.filter((todo) => !todo.completed);
    const completedTodos = todos.filter((todo) => todo.completed);

    // fetch todos on component mount
    useEffect(() => {
        if (status === "idle") {
            dispatch(fetchTodosAsync());
        }
    }, [status, dispatch]);

    const handleInputChange = useCallback((e) => {
        setInputValue(e.target.value);
    }, []);

    const handleAddTodo = useCallback(
        (e) => {
            e.preventDefault();

            if (!inputValue.trim()) return;

            const newTodo = {
                content: inputValue,
                completed: false,
            };

            dispatch(addTodoAsync(newTodo))
                .unwrap()
                .then(() => setInputValue(""))
                .catch((error) => console.error("Failed to add todo", error));
        },
        [inputValue, dispatch]
    );

    const handleDeleteTodo = useCallback(
        (id) => {
            dispatch(deleteTodoAsync(id));
        },
        [dispatch]
    );

    const handleToggleTodo = useCallback(
        (id, currentStatus) => {
            const todoToUpdate = todos.find((todo) => todo.id === id);
            if (todoToUpdate) {
                const updatedTodo = {
                    ...todoToUpdate,
                    completed: !currentStatus,
                };
                dispatch(updateTodoAsync({ id, updatedTodo }));
            }
        },
        [todos, dispatch]
    );

    const handleEditTodo = useCallback(
        (id, newContent) => {
            dispatch(editTodoContentAsync({ id, newContent }));
        },
        [dispatch]
    );

    if (status === "loading" && todos.length === 0) {
        return <div className="loading">Loading todos...</div>;
    }

    if (status === "failed") {
        return <div className="error">Error: {error}</div>;
    }

    return (
        <div className="todo-list-container">
            <form className="todo-form" onSubmit={handleAddTodo}>
                <input
                    type="text"
                    value={inputValue}
                    onChange={handleInputChange}
                    className="todo-input"
                />
                <button type="submit" className="submit-button">
                    Add Task
                </button>
            </form>

            <div className="lists-container">
                <div className="list-section">
                    <h2>Pending Tasks</h2>
                    {pendingTodos.length === 0 ? (
                        <p className="empty-list">No pending tasks</p>
                    ) : (
                        pendingTodos.map((todo) => (
                            <TodoItem
                                key={todo.id}
                                todo={todo}
                                onDelete={handleDeleteTodo}
                                onToggle={handleToggleTodo}
                                onEdit={handleEditTodo}
                            />
                        ))
                    )}
                </div>

                <div className="list-section">
                    <h2>Completed Tasks</h2>
                    <div className="todo-items">
                        {completedTodos.length === 0 ? (
                            <p className="empty-list">No completed tasks</p>
                        ) : (
                            completedTodos.map((todo) => (
                                <TodoItem
                                    key={todo.id}
                                    todo={todo}
                                    onDelete={handleDeleteTodo}
                                    onToggle={handleToggleTodo}
                                    onEdit={handleEditTodo}
                                />
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TodoList;
