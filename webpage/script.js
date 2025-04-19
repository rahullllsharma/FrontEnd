document.addEventListener('DOMContentLoaded', function() {
    const managerButton = document.getElementById('managerButton');
    const largeBox = document.querySelector('.large-box');
    const taskBox = document.getElementById('taskbox');
    const statusBox = document.querySelector('.statusbox');
    const taskButtons = document.querySelectorAll('#TaskButton');
    const notStartedButton = document.getElementById('NotStarted');
    const inProgressButton = document.getElementById('InProgress');
    const testingButton = document.getElementById('Testing');
    const doneButton = document.getElementById('Done');
    const statusText = document.getElementById('statusText');
    const editButton = document.getElementById('editButton');
    
    let clickedTaskButton = null;

    managerButton.addEventListener('click', function() {
        largeBox.classList.remove('hidden');
        taskBox.classList.toggle('hidden');
        statusBox.classList.add('hidden');
        statusText.textContent = 'Not Started';
    });

    document.addEventListener('click', function(event) {
        if (!largeBox.contains(event.target) && event.target !== managerButton && !largeBox.classList.contains('hidden')) {
            largeBox.classList.add('hidden');
            taskBox.classList.remove('hidden');
            statusBox.classList.add('hidden');
            statusText.textContent = 'Not Started';
        }
    });

    taskButtons.forEach(button => {
        button.addEventListener('click', function(event) {
            event.stopPropagation();
            clickedTaskButton = event.target;
            largeBox.classList.add('hidden');
            taskBox.classList.add('hidden');
            statusBox.classList.remove('hidden');
            statusText.textContent = 'Not Started';
        });
    });

    notStartedButton.addEventListener('click', function(event) {
        event.stopPropagation();
        if (clickedTaskButton) {
            clickedTaskButton.style.backgroundColor = '#828282';  
        }
        statusText.textContent = 'Not Started';
    });

    inProgressButton.addEventListener('click', function(event) {
        event.stopPropagation();
        if (clickedTaskButton) {
            clickedTaskButton.style.backgroundColor = 'orange';  
        }
        statusText.textContent = 'In Progress';
    });

    testingButton.addEventListener('click', function(event) {
        event.stopPropagation();
        if (clickedTaskButton) {
            clickedTaskButton.style.backgroundColor = 'yellow';  
        }
        statusText.textContent = 'Testing';
    });

    doneButton.addEventListener('click', function(event) {
        event.stopPropagation();
        if (clickedTaskButton) {
            clickedTaskButton.style.backgroundColor = '#4CAF50';  
        }
        statusText.textContent = 'Done';
    });

    const nextButtonInStatusBox = document.createElement('button');
    nextButtonInStatusBox.textContent = 'Next';
    nextButtonInStatusBox.classList.add('next-button');

    nextButtonInStatusBox.addEventListener('click', function(event) {
        event.stopPropagation();
        statusBox.classList.add('hidden');
        largeBox.classList.remove('hidden');
    });

    statusBox.appendChild(nextButtonInStatusBox);

    editButton.addEventListener('click', function(event) {
        event.stopPropagation();
        
        const newEmployee = document.createElement('div');
        newEmployee.classList.add('employee-box');

        const employeeNameInput = document.createElement('input');
        employeeNameInput.type = 'text';
        employeeNameInput.placeholder = 'Employee Name';

        const taskList = document.createElement('ul');

        const addTaskButton = document.createElement('button');
        addTaskButton.textContent = 'Add Task';
        addTaskButton.classList.add('task-button');

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.classList.add('delete-button');

        const newTaskInput = document.createElement('input');
        newTaskInput.type = 'text';
        newTaskInput.placeholder = 'New Task';

        employeeNameInput.addEventListener('blur', function() {
            if (employeeNameInput.value.trim() !== '') {
                const employeeNameHeading = document.createElement('h3');
                employeeNameHeading.textContent = employeeNameInput.value.trim();
                newEmployee.insertBefore(employeeNameHeading, employeeNameInput);
                employeeNameInput.remove();
            }
        });

        addTaskButton.addEventListener('click', function(event) {
            event.stopPropagation();
            const taskText = newTaskInput.value;

            if (taskText) {
                const newTaskButton = document.createElement('button');
                newTaskButton.textContent = taskText;
                newTaskButton.classList.add('task-button');

                newTaskButton.addEventListener('click', function(event) {
                    event.stopPropagation();
                    clickedTaskButton = newTaskButton;
                    largeBox.classList.add('hidden');
                    taskBox.classList.add('hidden');
                    statusBox.classList.remove('hidden');
                    statusText.textContent = 'Not Started';
                });

                const deleteTaskButton = document.createElement('button');
                deleteTaskButton.textContent = '-';
                deleteTaskButton.classList.add('delete-task-button');

                const taskListItem = document.createElement('li');
                taskListItem.appendChild(newTaskButton);
                taskListItem.appendChild(deleteTaskButton);
                taskList.appendChild(taskListItem);

                newTaskInput.value = '';

                deleteTaskButton.addEventListener('click', function(event) {
                    event.stopPropagation();
                    taskListItem.remove();
                });
            }
        });

        deleteButton.addEventListener('click', function(event) {
            event.stopPropagation();
            newEmployee.remove();
        });

        newEmployee.appendChild(employeeNameInput);
        newEmployee.appendChild(taskList);
        newEmployee.appendChild(newTaskInput);
        newEmployee.appendChild(addTaskButton);
        newEmployee.appendChild(deleteButton);

        largeBox.appendChild(newEmployee);
    });
});
