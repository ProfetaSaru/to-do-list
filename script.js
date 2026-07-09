// import { addTask, checkTask, editTask, getAllTasks, getTasks, saveAllTasks } from "./storageFunctions";

/*
<div class="task">
    <button class="task-check-mark">[ ]</button>
    <label class="task-text">Task to do</label>
</div>
*/

function createTaskElement() {
    console.log();
    taskList = document.getElementById('tasks')
    taskInput = document.getElementById("task-to-create")
    taskInputValue = taskInput.value

    if (taskInputValue == '') {
        console.log('no task input, write task');
        return
    }
    
    // creates and assigns a class to check button element
    button = document.createElement('button')
    button.className = 'task-check-mark'
    button.textContent = '[ ]'
    button.addEventListener('click', checkingTask)

    //creates and assings a class to label element
    label = document.createElement('label')
    label.className = 'task-text'
    label.textContent = ' - '  + taskInputValue + ' - - '

    // creates and assigns a class to check button element
    trash = document.createElement('button')
    trash.className = 'trash'
    trash.textContent = 'trash'
    trash.addEventListener('click', deleteTaskElement)

    //creates and assings a class to the whole task element
    div = document.createElement('div')
    div.className = 'task'
    div.appendChild(button)
    div.appendChild(label)
    div.appendChild(trash)

    //appends task to task list
    taskList.appendChild(div)
    console.log(div)
}

function checkingTask(event) {
    const checkMark = event.target.closest('.task-check-mark')
    if (checkMark.innerText == '[ ]') {
        checkMark.textContent = '[x]'
    } else {
        checkMark.textContent = '[ ]'
    }
}

function deleteTaskElement(event) {
    const task = event.target.closest('.task')
    task.remove()
}