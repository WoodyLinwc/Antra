import React from 'react';
import './TodoList.css';
import TodoItem from './TodoItem';

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

    handleAddTodo = (e) => {
        e.preventDefault();

        if(!this.state.inputValue.trim()) return;
        console.log("Adding todo:", this.state.inputValue);
        this.setState({ inputValue: ''})
    }

    componentDidMount(){
        this.fetchTodos();
    }

    fetchTodos = async() => {
        try{
            const response = await fetch('http://localhost:3001/todos');
            const data = await response.json();

            const pendingTodos = data.filter(todo => !todo.completed);
            const completedTodos = data.filter(todo => todo.completed);

            this.setState({
                todos,
                pendingTodos,
                completedTodos,
                loading: false
            });
        } catch (error){
            console.error('Error fetching todos:', error);
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
                    />
                    <button type='submit' className='submit-button'>submit</button>
                </form>

                <div className='lists-container'>
                        <div className='list-section'>
                            <h2>Pending Tasks</h2>
                            {pendingTodos.length === 0 ? (
                                <p className='empty-list'>No pending tasks</p>
                            ) : (
                                pendingTodos.map(todo => (
                                    <TodoItem key={todo.id} todo={todo}/>
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
                                    <TodoItem key={todo.id} todo={todo}/>
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