import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API_URL } from "../api";

// async thunks
export const fetchTodosAsync = createAsyncThunk(
    "todos/fetchTodos",
    async (_, { rejectWithValue }) => {
        try {
            const response = await fetch(`${API_URL}/todos`);
            if (!response.ok) {
                throw new Error(`HTTP Error: ${response.status}`);
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.error("Error fetching todos:", error);
            return rejectWithValue(error.message);
        }
    }
);

export const addTodoAsync = createAsyncThunk(
    "todos/addTodo",
    async (todo, { rejectWithValue }) => {
        try {
            const response = await fetch(`${API_URL}/todos`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(todo),
            });

            if (!response.ok) {
                throw new Error(`HTTP error: ${response.status}`);
            }

            const data = await response.json();
            return data;
        } catch (error) {
            console.error("Error adding todo:", error);
            return rejectWithValue(error.message);
        }
    }
);

export const deleteTodoAsync = createAsyncThunk(
    "todos/deleteTodo",
    async (id, { rejectWithValue }) => {
        try {
            const response = await fetch(`${API_URL}/todos/${id}`, {
                method: "DELETE",
            });

            if (!response.ok) {
                throw new Error(`HTTP error: ${response.status}`);
            }

            // return the id to remove it from state
            return id;
        } catch (error) {
            console.error("Error deleting todo:", error);
            return rejectWithValue(error.message);
        }
    }
);

export const updateTodoAsync = createAsyncThunk(
    "todos/updateTodo",
    async ({ id, updatedTodo }, { rejectWithValue }) => {
        try {
            const response = await fetch(`${API_URL}/todos/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(updatedTodo),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            return await response.json();
        } catch (error) {
            console.error("Error updating todo:", error);
            return rejectWithValue(error.message);
        }
    }
);

export const editTodoContentAsync = createAsyncThunk(
    "todos/editTodoContent",
    async ({ id, newContent }, { rejectWithValue, getState }) => {
        try {
            // get the current todo from state
            const { todos } = getState();
            const todo = todos.items.find((todo) => todo.id === id);

            if (!todo) {
                throw new Error("Todo not found");
            }

            // update only the content property
            const updatedTodo = { ...todo, content: newContent };

            const response = await fetch(`${API_URL}/todos/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(updatedTodo),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            return await response.json();
        } catch (error) {
            console.error("Error editing todo:", error);
            return rejectWithValue(error.message);
        }
    }
);

const todoSlice = createSlice({
    name: "todos",
    initialState: {
        items: [],
        status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        // fetch todos
        builder
            .addCase(fetchTodosAsync.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchTodosAsync.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.items = action.payload;
            })
            .addCase(fetchTodosAsync.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
            })

            // add todo
            .addCase(addTodoAsync.pending, (state) => {
                state.status = "loading";
            })
            .addCase(addTodoAsync.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.items.push(action.payload);
            })
            .addCase(addTodoAsync.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
            })

            // delete todo
            .addCase(deleteTodoAsync.pending, (state) => {
                state.status = "loading";
            })
            .addCase(deleteTodoAsync.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.items = state.items.filter(
                    (todo) => todo.id !== action.payload
                );
            })
            .addCase(deleteTodoAsync.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
            })

            // update todo
            .addCase(updateTodoAsync.pending, (state) => {
                state.status = "loading";
            })
            .addCase(updateTodoAsync.fulfilled, (state, action) => {
                state.status = "succeeded";
                const index = state.items.findIndex(
                    (todo) => todo.id === action.payload.id
                );
                if (index !== -1) {
                    state.items[index] = action.payload;
                }
            })
            .addCase(updateTodoAsync.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
            })

            // edit todo content
            .addCase(editTodoContentAsync.pending, (state) => {
                state.status = "loading";
            })
            .addCase(editTodoContentAsync.fulfilled, (state, action) => {
                state.status = "succeeded";
                const index = state.items.findIndex(
                    (todo) => todo.id === action.payload.id
                );
                if (index !== -1) {
                    state.items[index] = action.payload;
                }
            })
            .addCase(editTodoContentAsync.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
            });
    },
});

export default todoSlice.reducer;
