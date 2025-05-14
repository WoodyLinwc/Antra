import React from 'react';
import './TodoList.css';
import TodoItem from './TodoItem';
import { fetchTodos, addTodo, deleteTodo, updateTodo, editTodoContent } from '../api';

class TodoList extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            todos: [],
            pendingTodos: [],
            completedTodos: [],
            inputValue: '',
            loading: true
        };
    }

    handleInputChange = (e) => {
        this.setState({ inputValue: e.target.value });
    }

    handleAddTodo = async(e) => {
        e.preventDefault();

        if(!this.state.inputValue.trim()) return;
        console.log("Adding todo:", this.state.inputValue);
        
        const newTodo = {
            content: this.state.inputValue,
            completed: false
        };

        try {
            const addedTodo = await addTodo(newTodo);

            this.setState(prev => ({
                todos: [...prev.todos, addedTodo],
                pendingTodos: [...prev.pendingTodos, addedTodo],
                inputValue: ''
            }));
        } catch (error) {
            console.error('Error adding todo', error);
        }
    }

    handleDeleteTodo = async(id) => {
        try {
            await deleteTodo(id);
    
            this.setState(prev => ({
                todos: prev.todos.filter(todo => todo.id !== id),
                pendingTodos: prev.pendingTodos.filter(todo => todo.id !== id),
                completedTodos: prev.completedTodos.filter(todo => todo.id !== id),
            }));
        } catch (error) {
            console.error('Error deleting todo:', error);
        }
    }
    
    handleToggleTodo = async (id, currentStatus) => {
        try {
            const todoToUpdate = this.state.todos.find(todo => todo.id === id);
            const updatedTodo = {...todoToUpdate, completed: !currentStatus};
    
            await updateTodo(id, updatedTodo);
    
            this.setState(prev => {
                const updatedTodos = prev.todos.map(todo => 
                    todo.id === id ? {...todo, completed: !currentStatus} : todo
                );
                return {
                    todos: updatedTodos,
                    pendingTodos: updatedTodos.filter(todo => !todo.completed),
                    completedTodos: updatedTodos.filter(todo => todo.completed)
                };
            });
        } catch (error) {
            console.error('Error updating todo:', error);
        }
    }

    handleEditTodo = async (id, newContent) => {
        try {
            await editTodoContent(id, newContent);
            
            this.setState(prev => {
                const updatedTodos = prev.todos.map(todo => 
                    todo.id === id ? {...todo, content: newContent} : todo
                );
                return {
                    todos: updatedTodos,
                    pendingTodos: updatedTodos.filter(todo => !todo.completed),
                    completedTodos: updatedTodos.filter(todo => todo.completed)
                };
            });
        } catch (error) {
            console.error('Error editing todo:', error);
        }
    }

    componentDidMount(){
        this.fetchAllTodos();
    }

    fetchAllTodos = async() => {
        try{
            const data = await fetchTodos();

            const pendingTodos = data.filter(todo => !todo.completed);
            const completedTodos = data.filter(todo => todo.completed);

            this.setState({
                todos: data,
                pendingTodos,
                completedTodos,
                loading: false
            });
        } catch (error){
            console.error('Error fetching todos:', error);
            this.setState({ loading: false });
        }
    }

    render() {
        const {pendingTodos, completedTodos, inputValue, loading} = this.state;

        if(loading) {
            return <div className='loading'>Loading todos...</div>
        }

        return (
            <div className='todo-list-container'>
                <form className='todo-form' onSubmit={this.handleAddTodo}>
                    <input 
                    type="text" 
                    value={inputValue} 
                    onChange={this.handleInputChange}
                    className='todo-input'
                    placeholder="Add a new task"
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
                                    onDelete={this.handleDeleteTodo} 
                                    onToggle={this.handleToggleTodo}
                                    onEdit={this.handleEditTodo}
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
                                    onDelete={this.handleDeleteTodo} 
                                    onToggle={this.handleToggleTodo}
                                    onEdit={this.handleEditTodo}
                                />
                            ))
                        )}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default TodoList;