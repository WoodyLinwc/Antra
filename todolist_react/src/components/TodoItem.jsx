import React from 'react';
import './TodoItem.css';

class TodoItem extends React.Component {
    render(){
        const {todo, onDelete, onToggle} = this.props;

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
                    {todo.content}
                </div>

                <div className='todo-action'>
                    <button className='action-button edit'>🖊️</button>
                    <button className='action-button delete' onClick={() => onDelete(todo.id)}>🗑️ </button>
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
    }
}

export default TodoItem;