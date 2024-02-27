const taskList = document.getElementById('task-list');
const newTaskInput = document.getElementById('new-task');


const tasks = JSON.parse(localStorage.getItem('tasks')) || [];


function renderTasks() {
    taskList.innerHTML = '';

    tasks.forEach((task, index) => {
        const taskElement = createTaskElement(task, index);
        taskList.appendChild(taskElement);
    });


    saveTasks();
}


function createTaskElement(task, index) {
    const taskElement = document.createElement('li');
    taskElement.classList.add('task');
    if (task.completed) {
        taskElement.classList.add('completed');
    }

    taskElement.innerHTML = `
        <input type="text" value="${task.text}" class="${task.completed ? 'completed' : ''}" onchange="updateTask(${index}, this)">
        <button onclick="deleteTask(${index})">Delete</button>
        <button onclick="editTask(${index})">Edit</button>
    `;

    return taskElement;
}


function addTask() {
    const text = newTaskInput.value.trim();

    if (text !== '') {
        tasks.push({ text, completed: false });
        newTaskInput.value = '';
        renderTasks();
    }
}


function updateTask(index, inputElement) {
    tasks[index].completed = inputElement.checked;
    renderTasks();
}


function deleteTask(index) {
    tasks.splice(index, 1);
    renderTasks();
}


function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}


function editTask(index) {
    const newText = prompt('Edit Task:', tasks[index].text);
    if (newText !== null) {
        tasks[index].text = newText;
        renderTasks();
    }
}


renderTasks();
