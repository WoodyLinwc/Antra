import React from 'react';
import './TodoItem.css';

class TodoItem extends React.Component {
    render(){
        const {todo, onDelete, onToggle} = this.props;

        return (
            <div className={`todo-item ${todo.completed ? 'completed' : ''}`}>
                <div className='todo-content'>
                    {todo.content}
                </div>

                <div className='todo-action'>
                    <button className='action-button edit'>🖊️</button>
                    <button className='action-button delete' onClick={() => onDelete(todo.id)}>🗑️ </button>
                    <button className='action-button toggle' onClick={() => onToggle(todo.id, todo.completed)}>{todo.completed ? '←' : '→'}</button>
                </div>
            </div>
        );
    }
}

export default TodoItem;