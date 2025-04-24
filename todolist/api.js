export const APIs = (() => {
  const baseURL = "http://localhost:3000/todos";

  const getTodos = () => {
    return fetch(baseURL).then((res) => res.json());
  };

  const createTodo = (newTodo) => {
    return fetch(baseURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newTodo),
    }).then((res) => res.json());
  };

  const deleteTodo = (id) => {
    return fetch(`${baseURL}/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => res.json());
  };

  return {
    getTodos,
    createTodo,
    deleteTodo,
  };
})();
