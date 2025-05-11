import React from 'react';
import './TodoItem.css';

class TodoItem extends React.Component {
    render(){
        const {todo} = this.props;

        return (
            <div className={`todo-item ${todo.completed ? 'completed' : ''}`}>
                <div className='todo-content'>
                    {todo.content}
                </div>

                <div className='todo-action'>
                    <button className='action-button edit'>Edit</button>
                    <button className='action-button delete'>Delete</button>
                    <button className='action-button toggle'>{todo.completed ? '←' : '→'}</button>
                </div>
            </div>
        );
    }
}

export default TodoItem;