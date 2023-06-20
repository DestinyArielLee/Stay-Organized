"use strict";

const forms = document.querySelectorAll(".needs-validation");
const usernameDropdown = document.querySelector("#select_username");
const categoryDropdown = document.querySelector("#select_category");
const urgencyDropdown = document.querySelector("#select_urgency");
const deadlineInput = document.querySelector("#input_date");
const descriptionTextInput = document.querySelector("#text_todo");

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
  populateDropdown(categoryDropdown, data);
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
    userid: selectedUser,
    category: selectedCategory,
    description: descriptionText,
    deadline: deadlineDate,
    priority: selectedUrgency,
  };

  const response = await fetch('http://localhost:8083/api/todos', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    }, 
    body: JSON.stringify(toDoData)
  })
 const data = await response.json()
 console.log(data);
}

window.addEventListener("load", () => {
  populateUsers();
  populateCategories();
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
