const API_URL = 'http://localhost:3001';

// Fetch all todos
export const fetchTodos = async () => {
try {
    const response = await fetch(`${API_URL}/todos`);
    if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
} catch (error) {
    console.error('Error fetching todos:', error);
    throw error;
}
};

// Add a new todo
export const addTodo = async (todo) => {
try {
    const response = await fetch(`${API_URL}/todos`, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(todo)
    });
    
    if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return await response.json();
} catch (error) {
    console.error('Error adding todo:', error);
    throw error;
}
};

// Delete a todo by ID
export const deleteTodo = async (id) => {
try {
    const response = await fetch(`${API_URL}/todos/${id}`, {
    method: 'DELETE'
    });
    
    if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return true; // Successfully deleted
} catch (error) {
    console.error('Error deleting todo:', error);
    throw error;
}
};

// Update a todo
export const updateTodo = async (id, updatedTodo) => {
try {
    const response = await fetch(`${API_URL}/todos/${id}`, {
    method: 'PUT',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(updatedTodo)
    });
    
    if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return await response.json();
} catch (error) {
    console.error('Error updating todo:', error);
    throw error;
}
};

// Edit a todo's content
export const editTodoContent = async (id, newContent) => {
try {
    // First get the current todo
    const response = await fetch(`${API_URL}/todos/${id}`);
    if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const todo = await response.json();
    
    // Update only the content property
    const updatedTodo = { ...todo, content: newContent };
    
    // Save the updated todo
    return await updateTodo(id, updatedTodo);
} catch (error) {
    console.error('Error editing todo:', error);
    throw error;
}
};