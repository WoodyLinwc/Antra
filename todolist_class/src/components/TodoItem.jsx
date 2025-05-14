import React from 'react';
import './TodoItem.css';

class TodoItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isEditing: false,
            editValue: this.props.todo.content
        };
    }

    handleEditClick = () => {
        // Toggle edit mode
        this.setState({
            isEditing: !this.state.isEditing,
            editValue: this.props.todo.content
        });
    }

    handleEditChange = (e) => {
        this.setState({ editValue: e.target.value });
    }

    handleSaveEdit = () => {
        if (!this.state.editValue.trim()) {
            this.setState({
                isEditing: false,
                editValue: this.props.todo.content
            });
            return;
        }
        
        if (this.state.editValue !== this.props.todo.content) {
            this.props.onEdit(this.props.todo.id, this.state.editValue);
        }
        
        this.setState({ isEditing: false });
    }

    handleKeyDown = (e) => {
        // Save on Enter key
        if (e.key === 'Enter') {
            this.handleSaveEdit();
        }
        // Cancel on Escape key
        else if (e.key === 'Escape') {
            this.setState({
                isEditing: false,
                editValue: this.props.todo.content
            });
        }
    }

    render(){
        const {todo, onDelete, onToggle} = this.props;
        const {isEditing, editValue} = this.state;

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
                            value={editValue} 
                            onChange={this.handleEditChange}
                            onBlur={this.handleSaveEdit} // Save when clicking outside
                            onKeyDown={this.handleKeyDown}
                            className="edit-input"
                            autoFocus
                        />
                    ) : (
                        todo.content
                    )}
                </div>

                <div className='todo-action'>
                    <button 
                        className='action-button edit'
                        onClick={this.handleEditClick}
                    >
                        🖊️
                    </button>
                    <button className='action-button delete' onClick={() => onDelete(todo.id)}>🗑️</button>
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