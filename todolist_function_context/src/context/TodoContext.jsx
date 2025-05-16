import React, { createContext, useContext, useReducer, useMemo, useCallback, useEffect } from 'react';
import { fetchTodos, addTodo, deleteTodo, updateTodo, editTodoContent } from '../api';

// Initial state for the reducer
const initialState = {
    todos: [],
    loading: true,
    error: null,
    inputValue: ''
};

// Action types
const ActionTypes = {
    SET_TODOS: 'SET_TODOS',
    ADD_TODO: 'ADD_TODO',
    DELETE_TODO: 'DELETE_TODO',
    TOGGLE_TODO: 'TOGGLE_TODO',
    EDIT_TODO: 'EDIT_TODO',
    SET_LOADING: 'SET_LOADING',
    SET_ERROR: 'SET_ERROR',
    SET_INPUT_VALUE: 'SET_INPUT_VALUE'
};

// Reducer function
const todoReducer = (state, action) => {
switch (action.type) {
    case ActionTypes.SET_TODOS:
    return {
        ...state,
        todos: action.payload,
        loading: false
    };
    case ActionTypes.ADD_TODO:
    return {
        ...state,
        todos: [...state.todos, action.payload],
        inputValue: ''
    };
    case ActionTypes.DELETE_TODO:
    return {
        ...state,
        todos: state.todos.filter(todo => todo.id !== action.payload)
    };
    case ActionTypes.TOGGLE_TODO:
    return {
        ...state,
        todos: state.todos.map(todo =>
        todo.id === action.payload.id
            ? { ...todo, completed: !todo.completed }
            : todo
        )
    };
    case ActionTypes.EDIT_TODO:
    return {
        ...state,
        todos: state.todos.map(todo =>
        todo.id === action.payload.id
            ? { ...todo, content: action.payload.content }
            : todo
        )
    };
    case ActionTypes.SET_LOADING:
    return {
        ...state,
        loading: action.payload
    };
    case ActionTypes.SET_ERROR:
    return {
        ...state,
        error: action.payload,
        loading: false
    };
    case ActionTypes.SET_INPUT_VALUE:
    return {
        ...state,
        inputValue: action.payload
    };
    default:
    return state;
}
};

// Create context
const TodoContext = createContext();

// Custom hook to use the todo context
export const useTodoContext = () => {
const context = useContext(TodoContext);
if (!context) {
    throw new Error('useTodoContext must be used within a TodoProvider');
}
return context;
};

// Provider component
export const TodoProvider = ({ children }) => {
const [state, dispatch] = useReducer(todoReducer, initialState);

// Memoized derived states
const pendingTodos = useMemo(() => 
    state.todos.filter(todo => !todo.completed), 
    [state.todos]
);

const completedTodos = useMemo(() => 
    state.todos.filter(todo => todo.completed), 
    [state.todos]
);

// Fetch todos on component mount
useEffect(() => {
    const fetchAllTodos = async () => {
    try {
        const data = await fetchTodos();
        dispatch({ type: ActionTypes.SET_TODOS, payload: data });
    } catch (error) {
        dispatch({ type: ActionTypes.SET_ERROR, payload: error.message });
    }
    };

    fetchAllTodos();
}, []);

// Handle input change
const handleInputChange = useCallback((e) => {
    dispatch({ type: ActionTypes.SET_INPUT_VALUE, payload: e.target.value });
}, []);

// Add todo
const handleAddTodo = useCallback(async (e) => {
    e.preventDefault();

    if (!state.inputValue.trim()) return;
    
    const newTodo = {
    content: state.inputValue,
    completed: false
    };

    try {
    const addedTodo = await addTodo(newTodo);
    dispatch({ type: ActionTypes.ADD_TODO, payload: addedTodo });
    } catch (error) {
    dispatch({ type: ActionTypes.SET_ERROR, payload: error.message });
    }
}, [state.inputValue]);

// Delete todo
const handleDeleteTodo = useCallback(async (id) => {
    try {
    await deleteTodo(id);
    dispatch({ type: ActionTypes.DELETE_TODO, payload: id });
    } catch (error) {
    dispatch({ type: ActionTypes.SET_ERROR, payload: error.message });
    }
}, []);

// Toggle todo completion status
const handleToggleTodo = useCallback(async (id, currentStatus) => {
    try {
    const todoToUpdate = state.todos.find(todo => todo.id === id);
    const updatedTodo = {...todoToUpdate, completed: !currentStatus};
    
    await updateTodo(id, updatedTodo);
    
    dispatch({ type: ActionTypes.TOGGLE_TODO, payload: { id } });
    } catch (error) {
    dispatch({ type: ActionTypes.SET_ERROR, payload: error.message });
    }
}, [state.todos]);

// Edit todo content
const handleEditTodo = useCallback(async (id, newContent) => {
    try {
    await editTodoContent(id, newContent);
    
    dispatch({ 
        type: ActionTypes.EDIT_TODO, 
        payload: { id, content: newContent } 
    });
    } catch (error) {
    dispatch({ type: ActionTypes.SET_ERROR, payload: error.message });
    }
}, []);

// Value object with all the state and handlers
const value = {
    todos: state.todos,
    pendingTodos,
    completedTodos,
    loading: state.loading,
    error: state.error,
    inputValue: state.inputValue,
    handleInputChange,
    handleAddTodo,
    handleDeleteTodo,
    handleToggleTodo,
    handleEditTodo
};

return (
    <TodoContext.Provider value={value}>
    {children}
    </TodoContext.Provider>
);
};