document
  .getElementById("todoForm")
  .addEventListener("submit", (event) => handleTodoFormSubmit(event));

function handleTodoFormSubmit(event) {
  event.preventDefault();
  console.log(event);
  const todoInput = document.getElementById("todoInput");
  console.log(todoInput);

  const todoInputValue = todoInput.value;
  console.log(todoInputValue);

// If we get data from localStorage directly, we will get in a string format. 
// To get it in a form of array, we need to parse it using JSON.parse() method:
// let prevTodos = JSON.parse(localStorage.getItem("tasks")) || [];
// We well talk more about JSON after a few lessons.

  const prevTodos = localStorage.getItem("tasks");


  localStorage.setItem('todos', [prevTodos, todoInputValue]);

  const listItemElement = document.createElement("li");
  console.log(listItemElement);

  listItemElement.classList.add("todo-list-item");
  console.log(listItemElement);

  const spanElement = document.createElement("span");
  spanElement.classList.add("todo-text");
  console.log(spanElement);
  spanElement.textContent = todoInputValue;

  const removeTodoBtn = document.createElement("button");

  removeTodoBtn.textContent = "X";
  removeTodoBtn.classList.add("btn-danger");
  removeTodoBtn.addEventListener('click', () => {
    listItemElement.remove();
  })


  listItemElement.appendChild(spanElement);
  listItemElement.appendChild(removeTodoBtn);

  const ulElement = document.getElementById("list");

  ulElement.appendChild(listItemElement);

  todoInput.value = "";

  /*

  create span element, add text, add class
  create button element, add text, add event listener


   */
}

document.getElementById("clearListBtn").addEventListener("click", function () {
  const liElements = document.querySelectorAll("li");
  console.log(liElements);
  liElements.forEach((li) => (li.innerText = ""));
});



// TODO: when page is loaded, get todo items from local storage and add them to the unordered list element