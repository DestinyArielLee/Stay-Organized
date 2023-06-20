"use strict";

const forms = document.querySelectorAll(".needs-validation");
const usernameDropdown = document.querySelector("#select_username");
const categoryDropdown = document.querySelector("#select_category");
const urgencyDropdown = document.querySelector("#select_urgency");
const deadlineInput = document.querySelector("#input_date");
const descriptionTextInput = document.querySelector("#text_todo");
const contentCard = document.querySelector(".content-card");

async function fetcher(endPoint) {
  const response = await fetch(endPoint);
  const data = await response.json();
  return data;
}

function populateDropdown(dropdown, dropdownData) {
  for (const { id, name } of dropdownData) {
    const option = new Option(name, id);
    dropdown.insertAdjacentElement("beforeend", option);
  }
}
async function populateUsers() {
  const data = await fetcher("http://localhost:8083/api/users");
  populateDropdown(usernameDropdown, data);
}
async function populateCategories() {
  const data = await fetcher("http://localhost:8083/api/categories");
  for (const { name } of data) {
    const option = new Option(name, name);
    categoryDropdown.insertAdjacentElement("beforeend", option);
  }
}

async function addToDo() {
  const selectedUser = usernameDropdown[usernameDropdown.selectedIndex].value;
  const selectedCategory =
    categoryDropdown[categoryDropdown.selectedIndex].value;
  const selectedUrgency = urgencyDropdown[urgencyDropdown.selectedIndex].value;
  const deadlineDate = deadlineInput.value;
  const descriptionText = descriptionTextInput.value;

  // Validation
  if (
    !selectedUser ||
    !selectedCategory ||
    !selectedUrgency ||
    !deadlineDate ||
    !descriptionText
  )
    return;

  const toDoData = {
    userid: +selectedUser,
    category: selectedCategory,
    description: descriptionText,
    deadline: deadlineDate,
    priority: selectedUrgency,
  };

  const response = await fetch("http://localhost:8083/api/todos", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(toDoData),
  });
}

async function recentlyAddedToDos() {
  const data = await fetcher("http://localhost:8083/api/todos");

  const lastTodo = data.at(-1);
  const users = await fetcher("http://localhost:8083/api/users");

  const author = users.find((user) => user.id === +lastTodo.userid);

  contentCard.innerHTML = `<div class="card-big-shadow">
  <div
    class="card card-just-text"
    data-background="color"
    data-color="green"
    data-radius="none"
  >
    <div class="content">
      <h4 class="title text-success fw-bold mb-4">Category: ${lastTodo.category}</h4>
      <h6 class="title text-success fw-bold mb-4">By:  ${author.name}</h6>
      <p class="description text-success">
        ${lastTodo.description}
      </p>
    </div>
  </div>
</div>`;
}

window.addEventListener("load", () => {
  populateUsers();
  populateCategories();
  recentlyAddedToDos();
});

// Loop over them and prevent submission
Array.from(forms).forEach((form) => {
  form.addEventListener(
    "submit",
    (event) => {
      if (!form.checkValidity()) {
        event.preventDefault();
        event.stopPropagation();
      }
      event.preventDefault();
      form.classList.add("was-validated");
      addToDo();
    },
    false
  );
  form.addEventListener("reset", () => {
    form.classList.remove("was-validated");
    form.reset();
  });
});
