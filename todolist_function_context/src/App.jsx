import React from 'react';
import TodoList from './components/TodoList';
import { TodoProvider } from './context/TodoContext';
import './App.css';

const App = () => {
  return (
    <TodoProvider>
      <div className='todo-app'>
        <TodoList />
      </div>
    </TodoProvider>
  );
};

export default App;