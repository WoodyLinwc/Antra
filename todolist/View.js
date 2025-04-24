export const View = (() => {
  const todolistEl = document.querySelector(".todo__list");
  const inputEl = document.querySelector(".todo__input");
  const addBtnEl = document.querySelector(".todo__btn--add");

  const renderTodos = (todos) => {
    todolistEl.innerHTML = "";

    todos.forEach((todo) => {
      const todoItem = document.createElement("li");
      todoItem.id = todo.id;

      const span = document.createElement("span");
      span.textContent = todo.content;

      const button = document.createElement("button");
      button.textContent = "delete";
      button.classList.add("todo__btn--delete");

      todoItem.appendChild(span);
      todoItem.appendChild(button);
      todolistEl.appendChild(todoItem);
    });
  };

  const getInputValue = () => {
    return inputEl.value;
  };

  const clearInput = () => {
    inputEl.value = "";
  };

  return {
    renderTodos,
    getInputValue,
    clearInput,
    addBtnEl,
    todolistEl
  };
})();
