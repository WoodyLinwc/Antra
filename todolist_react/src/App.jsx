import React from 'react';
import TodoList from './components/TodoList';
import './App.css'

class App extends React.Component {
  render(){
    return (
      <div className='todo-app'>
        {/* <h1>Todo List Application</h1> */}
        <TodoList/>
      </div>
    )
  }
}

export default App;
