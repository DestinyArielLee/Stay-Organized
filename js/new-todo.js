"use strict";

const forms = document.querySelectorAll(".needs-validation");
const usernameDropdown = document.querySelector("#select_username");
const categoryDropdown = document.querySelector("#select_category");
const urgencyDropdown = document.querySelector("#select_urgency");

async function fetcher(endPoint) {
  const response = await fetch(endPoint);
  const data = await response.json();
  return data;
}

async function populateDropdown(dropdown) {
  const data = await fetcher("http://localhost:8083/api/users");
  for (const { id, name } of data) {
    console.log(id, name);
    const option = new Option(name, id);
    dropdown.insertAdjacentElement("beforeend", option);
  }
}

window.addEventListener("load", () => {
  populateDropdown(usernameDropdown);
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

      form.classList.add("was-validated");
    },
    false
  );
  form.addEventListener(
    "reset",
    (event) => {
      if (!form.checkValidity()) {
        event.preventDefault();
        event.stopPropagation();
      }

      form.classList.remove("was-validated");
    },
    false
  );
});
