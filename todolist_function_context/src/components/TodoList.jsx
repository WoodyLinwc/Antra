import React from 'react';
import './TodoList.css';
import TodoItem from './TodoItem';
import { useTodoContext } from '../context/TodoContext';

const TodoList = () => {
const { 
    pendingTodos, 
    completedTodos, 
    loading, 
    error,
    inputValue, 
    handleInputChange, 
    handleAddTodo 
} = useTodoContext();

if (loading) {
    return <div className='loading'>Loading todos...</div>;
}

if (error) {
    return <div className='error'>Error: {error}</div>;
}

return (
    <div className='todo-list-container'>
    <form className='todo-form' onSubmit={handleAddTodo}>
        <input 
        type="text" 
        value={inputValue} 
        onChange={handleInputChange}
        className='todo-input'
        />
        <button type='submit' className='submit-button'>Add Task</button>
    </form>

    <div className='lists-container'>
        <div className='list-section'>
        <h2>Pending Tasks</h2>
        {pendingTodos.length === 0 ? (
            <p className='empty-list'>No pending tasks</p>
        ) : (
            pendingTodos.map(todo => (
            <TodoItem 
                key={todo.id} 
                todo={todo}
            />
            ))
        )}
        </div>

        <div className='list-section'>
        <h2>Completed Tasks</h2>
        <div className="todo-items">
            {completedTodos.length === 0 ? (
            <p className="empty-list">No completed tasks</p>
            ) : (
            completedTodos.map(todo => (
                <TodoItem 
                key={todo.id} 
                todo={todo}
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