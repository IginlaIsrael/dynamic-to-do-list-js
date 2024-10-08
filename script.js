// document.addEventListener('DOMContentLoaded', function() {

//     // Selecting DOM elements
//     const addButton = document.getElementById('add-task-btn');
//     const taskInput = document.getElementById('task-input');
//     const taskList = document.getElementById('task-list');

//     // The aadd task function
//     function addTask() {
//         const taskText = taskInput.value.trim();

//         if (taskText === "") {
//             alert("Please enter a task.");
//             return;
//         }
//         const li = document.createElement('li');
//         li.textContent = taskText;

//         const removeButton = document.createElement('button');
//         removeButton.textContent = 'Remove';
//         removeButton.classList.add('remove-btn');
//         li.appendChild(removeButton);
//         taskList.appendChild(li);

//         taskInput.value = "";
//         removeButton.addEventListener('click', function() {
//             taskList.removeChild(li);
//         });
//     }

//     addButton.addEventListener('click', addTask);
//     taskInput.addEventListener('keypress', function(event) {
//         if (event.key === 'Enter') {
//             addTask();
//         }
//     });

// });


// Wait for the DOM to fully load before running the script
document.addEventListener('DOMContentLoaded', () => {

    // Get references to important DOM elements
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Function to load tasks from Local Storage on page load
    function loadTasks() {
        const tasksFromStorage = JSON.parse(localStorage.getItem('tasks') || '[]');
        
        // If tasks exist in Local Storage, loop through them and add each one to the list
        tasksFromStorage.forEach(taskText => {
            addTask(taskText, false);  // false so it doesn't save again to storage
        });
    }

    // Function to handle adding a task to the list and Local Storage
    function addTask(taskText, shouldSave = true) {
        // Clean up the input (remove leading/trailing whitespace)
        taskText = taskText.trim();

        // Make sure the input isn't empty
        if (taskText === "") {
            alert("Please enter a task.");
            return;
        }

        // Create a new <li> element to hold the task
        const li = document.createElement('li');
        li.textContent = taskText;

        // Create a "Remove" button for the task
        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.classList.add('remove-btn');

        // Add the button to the task item
        li.appendChild(removeButton);

        // Add the task item to the task list in the DOM
        taskList.appendChild(li);

        // Clear the input field
        taskInput.value = "";

        // Set up the remove button to delete the task when clicked
        removeButton.addEventListener('click', () => {
            taskList.removeChild(li);  // Remove the task from the DOM
            removeTaskFromStorage(taskText);  // Remove the task from Local Storage
        });

        // Only save the task to Local Storage if shouldSave is true (prevents duplicates when loading)
        if (shouldSave) {
            saveTaskToStorage(taskText);
        }
    }

    // Function to save a task to Local Storage
    function saveTaskToStorage(taskText) {
        const tasksFromStorage = JSON.parse(localStorage.getItem('tasks') || '[]');

        // Add the new task to the array of stored tasks
        tasksFromStorage.push(taskText);

        // Save the updated array back to Local Storage
        localStorage.setItem('tasks', JSON.stringify(tasksFromStorage));
    }

    // Function to remove a task from Local Storage
    function removeTaskFromStorage(taskText) {
        let tasksFromStorage = JSON.parse(localStorage.getItem('tasks') || '[]');

        // Filter out the task that matches the one we want to remove
        tasksFromStorage = tasksFromStorage.filter(task => task !== taskText);

        // Save the updated array back to Local Storage
        localStorage.setItem('tasks', JSON.stringify(tasksFromStorage));
    }

    // Event listener for the "Add Task" button
    addButton.addEventListener('click', () => {
        addTask(taskInput.value);
    });

    // Allow tasks to be added by pressing Enter in the input field
    taskInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            addTask(taskInput.value);
        }
    });

    // Load tasks from Local Storage when the page loads
    loadTasks();

});
