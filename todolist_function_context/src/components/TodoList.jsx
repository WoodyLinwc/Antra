import React, { useState, useEffect, useCallback, useMemo } from 'react';
import './TodoList.css';
import TodoItem from './TodoItem';
import { fetchTodos, addTodo, deleteTodo, updateTodo, editTodoContent } from '../api';

const TodoList = () => {
const [todos, setTodos] = useState([]);
const [inputValue, setInputValue] = useState('');
const [loading, setLoading] = useState(true);

// Derived states using useMemo
const pendingTodos = useMemo(() => 
    todos.filter(todo => !todo.completed), 
    [todos]
);

const completedTodos = useMemo(() => 
    todos.filter(todo => todo.completed), 
    [todos]
);

// Fetch todos on component mount
useEffect(() => {
    const fetchAllTodos = async () => {
    try {
        const data = await fetchTodos();
        setTodos(data);
        setLoading(false);
    } catch (error) {
        console.error('Error fetching todos:', error);
        setLoading(false);
    }
    };

    fetchAllTodos();
}, []);

const handleInputChange = useCallback((e) => {
    setInputValue(e.target.value);
}, []);

const handleAddTodo = useCallback(async (e) => {
    e.preventDefault();

    if (!inputValue.trim()) return;
    
    const newTodo = {
    content: inputValue,
    completed: false
    };

    try {
    const addedTodo = await addTodo(newTodo);
    setTodos(prev => [...prev, addedTodo]);
    setInputValue('');
    } catch (error) {
    console.error('Error adding todo', error);
    }
}, [inputValue]);

const handleDeleteTodo = useCallback(async (id) => {
    try {
    await deleteTodo(id);
    setTodos(prev => prev.filter(todo => todo.id !== id));
    } catch (error) {
    console.error('Error deleting todo:', error);
    }
}, []);

const handleToggleTodo = useCallback(async (id, currentStatus) => {
    try {
    const todoToUpdate = todos.find(todo => todo.id === id);
    const updatedTodo = {...todoToUpdate, completed: !currentStatus};
    
    await updateTodo(id, updatedTodo);
    
    setTodos(prev => 
        prev.map(todo => 
        todo.id === id ? {...todo, completed: !currentStatus} : todo
        )
    );
    } catch (error) {
    console.error('Error updating todo:', error);
    }
}, [todos]);

const handleEditTodo = useCallback(async (id, newContent) => {
    try {
    await editTodoContent(id, newContent);
    
    setTodos(prev => 
        prev.map(todo => 
        todo.id === id ? {...todo, content: newContent} : todo
        )
    );
    } catch (error) {
    console.error('Error editing todo:', error);
    }
}, []);

if (loading) {
    return <div className='loading'>Loading todos...</div>;
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
                onDelete={handleDeleteTodo} 
                onToggle={handleToggleTodo}
                onEdit={handleEditTodo}
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