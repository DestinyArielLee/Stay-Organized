"use strict";


fetchData();

async function fetchData(){
    try{
        const response = await fetch("http://localhost:8083/api/users");
        const data = await response.json();
        displayUserDropdown(data);
    } catch(error){
        console.log(`Error: ${error}`);
    }
}

const userDropdown = document.getElementById("dropdown");

function displayUserDropdown(dataArray){   
    dataArray.forEach(user => {
        var option = document.createElement("option");
        option.textContent = user.name;
        option.value = user.id;
        userDropdown.appendChild(option);
    });
}

async function showTasks(){
    try{
        const response = await fetch("http://localhost:8083/api/todos");
        const data = await response.json();
        let html = "";
        for (let i = 0; i < data.length; i ++){
            if (userDropdown.value == data[i].userid){
                html += `Category: ${data[i].category} <br>
                Description: ${data[i].description} <br>
                Deadline: ${data[i].deadline} <br>
                Priority: ${data[i].priority}`
            }
        }
        tasksDiv.innerHTML = html;
        data.forEach(user => {
            if (userDropdown.value == data[user].userid){
                tasksDiv.textContent += data[user].description;
            }
        });
        console.log(data);
    } catch(error){
        console.log(`Error: ${error}`);
    }
}

const tasksDiv = document.getElementById("tasks");
const searchBtn = document.getElementById("search");
searchBtn.addEventListener("click", function(){showTasks()});
