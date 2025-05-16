import React, { useState, useCallback, useRef, memo } from 'react';
import './TodoItem.css';

const TodoItem = memo(({ todo, onDelete, onToggle, onEdit }) => {
const [isEditing, setIsEditing] = useState(false);
const [editValue, setEditValue] = useState(todo.content);
const inputRef = useRef(null);

// Focus input element when entering edit mode
React.useEffect(() => {
    if (isEditing && inputRef.current) {
    inputRef.current.focus();
    }
}, [isEditing]);

const handleEditClick = useCallback(() => {
    setIsEditing(prev => !prev);
    setEditValue(todo.content);
}, [todo.content]);

const handleEditChange = useCallback((e) => {
    setEditValue(e.target.value);
}, []);

const handleSaveEdit = useCallback(() => {
    if (!editValue.trim()) {
    setIsEditing(false);
    setEditValue(todo.content);
    return;
    }
    
    if (editValue !== todo.content) {
    onEdit(todo.id, editValue);
    }
    
    setIsEditing(false);
}, [editValue, todo.content, todo.id, onEdit]);

const handleKeyDown = useCallback((e) => {
    // Save on Enter key
    if (e.key === 'Enter') {
    handleSaveEdit();
    }
    // Cancel on Escape key
    else if (e.key === 'Escape') {
    setIsEditing(false);
    setEditValue(todo.content);
    }
}, [handleSaveEdit, todo.content]);

return (
    <div className={`todo-item ${todo.completed ? 'completed' : ''}`}>
    {todo.completed && (
        <button 
        className='action-button toggle left-toggle' 
        onClick={() => onToggle(todo.id, todo.completed)}
        >
        ←
        </button>
    )}
    
    <div className='todo-content'>
        {isEditing ? (
        <input 
            type="text" 
            ref={inputRef}
            value={editValue} 
            onChange={handleEditChange}
            onBlur={handleSaveEdit}
            onKeyDown={handleKeyDown}
            className="edit-input"
        />
        ) : (
        todo.content
        )}
    </div>

    <div className='todo-action'>
        <button 
        className='action-button edit'
        onClick={handleEditClick}
        >
        🖊️
        </button>
        <button 
        className='action-button delete' 
        onClick={() => onDelete(todo.id)}
        >
        🗑️
        </button>
        {!todo.completed && (
        <button 
            className='action-button toggle' 
            onClick={() => onToggle(todo.id, todo.completed)}
        >
            →
        </button>
        )}
    </div>
    </div>
);
});

TodoItem.displayName = 'TodoItem';

export default TodoItem;