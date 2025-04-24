export const Model = (() => {
  class State {
    #todos = [];
    #onChange = () => {};

    get todos() {
      return this.#todos;
    }

    set todos(newTodos) {
      this.#todos = newTodos;
      this.#onChange();
    }

    addTodo(newTodo) {
      this.todos = [...this.todos, newTodo]; // immutably
    }

    deleteTodo(id) {
      this.todos = this.todos.filter((todo) => todo.id !== id);
    }

    subscribe(cb) {
      this.#onChange = cb;
    }
  }
  return { State };
})();
