"use strict";

fetchData();

async function fetchData() {
  try {
    const response = await fetch("http://localhost:8083/api/users");
    const data = await response.json();
    displayUserDropdown(data);
  } catch (error) {
    console.log(`Error: ${error}`);
  }
}

const userDropdown = document.getElementById("dropdown");

function displayUserDropdown(dataArray) {
  dataArray.forEach((user) => {
    var option = document.createElement("option");
    option.textContent = user.name;
    option.value = user.id;
    userDropdown.appendChild(option);
  });
}

async function showTasks() {
  try {
    const response = await fetch("http://localhost:8083/api/todos");
    const data = await response.json();
    const selectedUser = +userDropdown[userDropdown.selectedIndex].value; // Selecting actual user from dropdown
    console.log(selectedUser);
    console.log(data);
    let html = "";
    for (let i = 0; i < data.length; i++) {
      if (selectedUser == +data[i].userid) {
        // I added the card styling to this snippet
        html += `
<div class="col-4 content-card >
    <div class="card-big-shadow">
        <div
            class="card card-just-text "
            data-background="color"
            data-color="green"
            data-radius="none"
        >
            <div class="content">
            <h4 class="title text-success fw-bold mb-4">Category: ${data[i].category}</h4>
            <h6 class="title text-success fw-bold mb-4">By: Deadline: ${data[i].deadline}ToDo</h6>
            <p class="description text-success">
            ${data[i].description}
            </p>
            <p class="description text-success">
            Priority: ${data[i].priority}
            </p>
            
            </div>
        </div>
  </div>
</div>
`;
      }
    }
    tasksDiv.innerHTML = html;

    // This code is not necessary since you already did it with the first loop
    // data.forEach((user) => {
    //   if (userDropdown.value == data[user].userid) {
    //     tasksDiv.textContent += data[user].description;
    //   }
    // });
  } catch (error) {
    console.log(`Error: ${error}`);
  }
}

const tasksDiv = document.getElementById("tasks");
const searchBtn = document.getElementById("search");
searchBtn.addEventListener("click", function () {
  showTasks();
});
