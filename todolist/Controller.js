import { APIs } from "./api.js";
import { Model } from "./Model.js";
import { View } from "./View.js";

const Controller = ((model, view, api) => {
  const state = new model.State();

  const addTodoHandler = (e) => {
    e.preventDefault();
    const content = view.getInputValue();
    console.log("add", content);

    if (content.trim() === "") return;

    api.createTodo({ content }).then((newTodo) => {
      view.clearInput();
      state.addTodo(newTodo);
      console.log(state.todos);
    });
  };

  // delete handler function
  const deleteTodoHandler = (e,id) => {
    e.preventDefault();
    e.stopPropagation();

    api.deleteTodo(id).then(() => {
      state.deleteTodo(id);
    });
  };


  const init = () => {
    state.subscribe(() => {
      view.renderTodos(state.todos);
    });

    api.getTodos().then((todos) => {
      state.todos = todos;
      console.log(todos);
    });

    view.addBtnEl.addEventListener("click", addTodoHandler);

    // event delegation
    document.querySelector(".todo__list").addEventListener("click", (e) => {
      if (e.target.classList.contains("todo__btn--delete")) {
        e.preventDefault();
        const todoItem = e.target.closest("li");
        const id = todoItem.id;
        deleteTodoHandler(e,id);
      }
    });
  };

  return { init };
})(Model, View, APIs);

Controller.init();
