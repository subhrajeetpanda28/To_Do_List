let taskForm = document.getElementById('task-form');
let taskInput = document.getElementById('task-input');
let taskListEl = document.getElementById('task-list-el');

// Initialize taskList from localStorage or empty array
let taskList = localStorage.getItem('tasks') ? JSON.parse(localStorage.getItem('tasks')) : [];

if (taskList.length === 0) {
    taskInput.placeholder = "List is Empty";
}

// Submit form - Add new task
taskForm.addEventListener('submit', function (e) {
    e.preventDefault();

    if (taskInput.value.trim() === '') {
        return;
    }

    // Create a task object with name and completed status
    let task = {
        name: taskInput.value.trim(),
        completed: false
    };

    taskList.unshift(task); // Add to the start of the array
    localStorage.setItem('tasks', JSON.stringify(taskList));

    displayTasks(taskList);

    taskInput.value = '';
});

// Display tasks
function displayTasks(tasks) {
    let eachTask = "";

    tasks.forEach((task, index) => {
        let checked = task.completed ? 'checked' : '';
        let taskStyle = task.completed ? 'text-decoration: line-through; color: grey;' : '';

        eachTask += `
        <li class="list-group-item d-flex justify-content-between align-items-center">
            <div class="d-flex align-items-center">
                <input type="checkbox" class="form-check-input me-2" ${checked} onchange="toggleComplete(${index})">
                <span class="fw-bold" style="${taskStyle}">${task.name}</span>
            </div>
            <div>
                <button class="btn btn-sm btn-outline-primary me-2" onclick="updateTask(${index})">
                    <i class="bi bi-pencil"></i> Edit
                </button>
                <button class="btn btn-sm btn-outline-danger" onclick="deleteTask(${index})">
                    <i class="bi bi-trash"></i> Delete
                </button>
            </div>
        </li>`;
    });

    taskListEl.innerHTML = eachTask;
}

// Toggle complete status
function toggleComplete(index) {
    taskList[index].completed = !taskList[index].completed;
    localStorage.setItem('tasks', JSON.stringify(taskList));
    displayTasks(taskList);
}

// Delete task
function deleteTask(id) {
    taskList.splice(id, 1);
    localStorage.setItem('tasks', JSON.stringify(taskList));
    displayTasks(taskList);
}

// Update task
function updateTask(id) {
    taskInput.value = taskList[id].name;

    // Remove the task from list temporarily until edited value is re-added
    taskList.splice(id, 1);
    localStorage.setItem('tasks', JSON.stringify(taskList));
    displayTasks(taskList);
}

// Initial display on load
displayTasks(taskList);
