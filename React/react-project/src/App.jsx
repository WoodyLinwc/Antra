import { useState, useRef, useEffect } from 'react'
import TodoList from './TodoList'
import { v4 as uuidv4 } from 'uuid';


const KEY = 'todoApp.todos';

function App() {
  const [todos, setTodos] = useState([]);
  const todoRefName = useRef();

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem(KEY));
    console.log("Loading todos:", storedTodos);
    if(storedTodos){
      setTodos(storedTodos);
    }
  }, [])


  useEffect(() => {
    console.log("Saving todos:", todos);
    localStorage.setItem(KEY, JSON.stringify(todos))
  }, [todos])

  function handleAddTodo(e){
    const name = todoRefName.current.value;
    if(name === '') return;
    setTodos(prevTodo => {
      return [...prevTodo, {id: uuidv4(), name: name, complete: false}]
    })
    todoRefName.current.value = null;
  }

  return (
    <>
     <input ref={todoRefName} type="text" />
     <button onClick={handleAddTodo}>Add Todo</button>
     <button>Clear Complete</button>
     <div>0 left to do</div>
     <TodoList todos={todos}/>
    </>
   
  )
}

export default App
