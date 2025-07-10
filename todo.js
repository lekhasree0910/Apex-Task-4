document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('taskInput');
    const addTaskBtn = document.getElementById('addTaskBtn');
    const taskList = document.getElementById('taskList');
    const clearAllBtn = document.getElementById('clearAllBtn');

    // Load tasks from Local Storage
    function loadTasks() {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.forEach(task => addTaskToDOM(task.text, task.completed));
    }

    // Save tasks to Local Storage
    function saveTasks() {
        const tasks = [];
        document.querySelectorAll('#taskList li').forEach(li => {
            tasks.push({
                text: li.querySelector('span').textContent,
                completed: li.classList.contains('completed')
            });
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    // Add a new task to the DOM
    function addTaskToDOM(taskText, isCompleted = false) {
        if (taskText.trim() === '') {
            alert('Task cannot be empty!');
            return;
        }

        const li = document.createElement('li');
        const taskSpan = document.createElement('span');
        taskSpan.textContent = taskText;
        li.appendChild(taskSpan);

        if (isCompleted) {
            li.classList.add('completed');
        }

        const actionsDiv = document.createElement('div');
        actionsDiv.classList.add('task-actions');

        const completeBtn = document.createElement('button');
        completeBtn.classList.add('complete-btn');
        completeBtn.innerHTML = '<i class="fas fa-check"></i>'; // Font Awesome icon
        completeBtn.title = 'Mark as complete';
        completeBtn.onclick = () => {
            li.classList.toggle('completed');
            saveTasks();
        };

        const deleteBtn = document.createElement('button');
        deleteBtn.classList.add('delete-btn');
        deleteBtn.innerHTML = '<i class="fas fa-trash-alt"></i>'; // Font Awesome icon
        deleteBtn.title = 'Delete task';
        deleteBtn.onclick = () => {
            taskList.removeChild(li);
            saveTasks();
        };

        actionsDiv.appendChild(completeBtn);
        actionsDiv.appendChild(deleteBtn);
        li.appendChild(actionsDiv);
        taskList.appendChild(li);

        taskInput.value = ''; // Clear input field
        saveTasks(); // Save tasks after adding
    }

    // Event listener for Add Task button
    addTaskBtn.addEventListener('click', () => {
        addTaskToDOM(taskInput.value);
    });

    // Event listener for Enter key in input field
    taskInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            addTaskToDOM(taskInput.value);
        }
    });

    // Event listener for Clear All button
    clearAllBtn.addEventListener('click', () => {
        if (confirm('Are you sure you want to clear all tasks?')) {
            taskList.innerHTML = ''; // Clear tasks from DOM
            saveTasks(); // Clear tasks from Local Storage
        }
    });

    // Load tasks when the page loads
    loadTasks();
});

// Important: For Font Awesome icons to display, add this line in your HTML <head>
// <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css">