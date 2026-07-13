import { addTask, checkTask, editTask, getAllTasks, saveAllTasks, deleteTask } from "./storageFunctions.js";


const createButton = document.getElementById('create-task-button')
createButton.addEventListener('click', createNewTaskElement)

function element(tag, elementClass, textContent, event) {
    const elementType = document.createElement(tag)
    elementType.className = elementClass
    elementType.textContent = textContent
    if (event) {
        elementType.addEventListener('click', event)
    }
    return elementType
}

function taskMaker(status, taskInputValue) {
    const checkText = status ? '[x]' : '[ ]'
    const button = element('button', 'task-check-mark', checkText, checkingTask)
    const label = element('label', 'task-text', ' - '  + taskInputValue + ' - - ')
    const trash = element('button', 'trash', 'trash', deleteTaskElement)
    const edit = element('button', 'edit-button', 'edit', editTheTask)
    
    //creates and assings a class to the whole task element
    const div = document.createElement('div')
    div.className = 'task'
    div.appendChild(button)
    div.appendChild(label)
    div.appendChild(trash)

    return div
}

function createNewTaskElement() {
    console.log();
    const taskList = document.getElementById('tasks')
    const taskInput = document.getElementById("task-to-create")
    const taskInputValue = taskInput.value

    if (taskInputValue == '') {
        console.log('no task input, write task');
        return
    }
    
    const div =  taskMaker(false, taskInputValue)
    
    const id = addTask(taskInputValue)

    //appends task to task list
    taskList.appendChild(div)
    console.log(div)
}

function checkingTask(event) {
    const task = event.target.closest('.task')
    const id = Number(task.dataset.id)
    const newStatus = checkTask(id)
    
    const checkMark = event.target.closest('.task-check-mark')
    checkMark.textContent = newStatus ? '[x]' : '[ ]'
}

function deleteTaskElement(event) {
    const task = event.target.closest('.task')
    const id = Number(task.dataset.id)
    deleteTask(id)
    task.remove()
}