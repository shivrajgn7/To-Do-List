const inputBox = document.getElementById('input-box');
const listContainer = document.getElementById('list-container');
const editBtn = document.getElementById('edit-btn');
const saveBtn = document.getElementById('save-btn');
let editLi = null;

function saveup() {
    alert("Saved");
    saveData();
}

function addTask() {
    if (inputBox.value === '') {
        alert('You must write something!');
    } else {
        let li = document.createElement("li");
        li.innerHTML = inputBox.value;
        // Add edit and save buttons to each li
        let editButton = document.createElement("button");
        editButton.textContent = "Edit";
        editButton.className = "li-edit-btn";
        editButton.onclick = function(e) {
            e.stopPropagation();
            startEditTask(li);
        };
        let saveButton = document.createElement("button");
        saveButton.textContent = "Save";
        saveButton.className = "li-save-btn";
        saveButton.style.display = "save-btn";
        saveButton.onclick = function(e) {
            e.stopPropagation();
            finishEditTask(li, saveButton, editButton);
        };
        li.appendChild(editButton);
        li.appendChild(saveButton);
        let span = document.createElement("span");
        span.innerHTML = "\u00d7";
        li.appendChild(span);
        listContainer.appendChild(li);
    }
    inputBox.value = '';
    saveData();
}

function startEditTask(li) {
    inputBox.value = li.childNodes[0].nodeValue;
    editLi = li;
    editBtn.style.display = "none";
    saveBtn.style.display = "inline-block";
    // Hide li's edit button, show its save button
    li.querySelector('.li-edit-btn').style.display = "none";
    li.querySelector('.li-save-btn').style.display = "inline-block";
}

function finishEditTask(li, saveButton, editButton) {
    li.childNodes[0].nodeValue = inputBox.value;
    inputBox.value = '';
    editLi = null;
    saveBtn.style.display = "none";
    editBtn.style.display = "none";
    saveButton.style.display = "none";
    editButton.style.display = "inline-block";
    saveData();
}

function editTask() {
    if (editLi) {
        inputBox.value = editLi.childNodes[0].nodeValue;
        saveBtn.style.display = "inline-block";
        editBtn.style.display = "none";
    }
}

function saveEdit() {
    if (editLi) {
        editLi.childNodes[0].nodeValue = inputBox.value;
        inputBox.value = '';
        saveBtn.style.display = "none";
        editBtn.style.display = "none";
        editLi.querySelector('.li-edit-btn').style.display = "inline-block";
        editLi.querySelector('.li-save-btn').style.display = "none";
        editLi = null;
        saveData();
    }
}

listContainer.addEventListener("click", function(e) {
    if (e.target.tagName === 'LI') {
        e.target.classList.toggle('checked');
        saveData();
    } else if (e.target.tagName === 'SPAN') {
        e.target.parentElement.remove();
        saveData();
    }
}, false);

function saveData() {
    localStorage.setItem("data", listContainer.innerHTML);
}

function showTask() {
    listContainer.innerHTML = localStorage.getItem("data") || '';
    // Re-attach event listeners to edit/save buttons after loading
    Array.from(listContainer.children).forEach(li => {
        let editButton = li.querySelector('.li-edit-btn');
        let saveButton = li.querySelector('.li-save-btn');
        if (editButton) {
            editButton.onclick = function(e) {
                e.stopPropagation();
                startEditTask(li);
            };
        }
        if (saveButton) {
            saveButton.onclick = function(e) {
                e.stopPropagation();
                finishEditTask(li, saveButton, editButton);
            };
        }
    });
}

showTask();