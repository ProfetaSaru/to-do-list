import { addTask, checkTask, editTask, getAllTasks, deleteTask } from "./storageFunctions.js";



function element(tag, elementClass, textContent, event) {
    const elementType = document.createElement(tag)
    elementType.className = elementClass
    elementType.innerHTML = textContent
    if (event) {
        elementType.addEventListener('click', event)
    }
    return elementType
}

function checkingTask(event) {
    const task = event.target.closest('.task')
    const id = Number(task.dataset.id)
    const newStatus = checkTask(id)
    
    const checkMark = event.target.closest('.task-check-mark')
    checkMark.innerHTML = newStatus ? '<i class="fa-regular fa-square-check"></i>' : '<i class="fa-regular fa-square"></i>'
}

function deleteTaskElement(event) {
    const task = event.target.closest('.task')
    const id = Number(task.dataset.id)
    deleteTask(id)
    task.remove()
}

function taskMaker(status, taskInputValue) {
    const checkText = status ? '<i class="fa-regular fa-square-check"></i>' : '<i class="fa-regular fa-square"></i>'
    const button = element('button', 'task-check-mark', checkText, checkingTask)
    const label = element('label', 'task-text', taskInputValue)
    const trash = element('button', 'trash', '<i class="fa-solid fa-trash"></i>', deleteTaskElement)
    const edit = element('button', 'edit-button', '<i class="fa-solid fa-pen-to-square"></i>', editTheTask)
    
    //creates and assings a class to the whole task element
    const div = document.createElement('div')
    div.className = 'task'
    div.appendChild(button)
    div.appendChild(edit)
    div.appendChild(label)
    div.appendChild(trash)
    
    return div
}

function rebuildTask(task, id) {
    const tasks = getAllTasks()
    const saved = tasks.find(t => t.id === id)
    const rebuilt = taskMaker(saved.status, saved.text)
    rebuilt.dataset.id = id
    rebuilt.className = 'task'
    task.replaceWith(rebuilt)
}

function confirmEdit(event) {
    const task = event.target.closest('.task-edit')
    const id = Number(task.dataset.id)
    const input = task.querySelector('.task-edit-field')
    
    const test = editTask(id, input.value)
    console.log(test);
    
    rebuildTask(task, id)
}

function cancelEdit(event) {
    const task = event.target.closest('.task-edit')
    const id = Number(task.dataset.id)
    rebuildTask(task, id)
}

function editTheTask(event) {
    const task = event.target.closest('.task')
    const id = Number(task.dataset.id)
    const currentLabel = task.querySelector('.task-text')
    const currentText = currentLabel.textContent

    const input = element('textarea', 'task-edit-field')
    input.value = currentText
    const confirm = element('button', 'confirm', 'confirm', confirmEdit)
    const cancel = element('button', 'cancel', 'cancel', cancelEdit)
    
    task.innerHTML = ''
    task.dataset.id = id
    task.className = 'task-edit'
    task.appendChild(input)
    task.appendChild(confirm)
    task.appendChild(cancel)
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
    div.dataset.id = id
    taskList.appendChild(div)
    console.log(div)
}

function renderFromStorage() {
    const taskList = document.getElementById('tasks')
    const array = getAllTasks()
    for (let index = 0; index < array.length; index++) {
        const element = array[index];
        const task = taskMaker(element.status, element.text)
        task.dataset.id = element.id
        taskList.appendChild(task)
    }
}

const createButton = document.getElementById('create-task-button')
createButton.addEventListener('click', createNewTaskElement)

renderFromStorage()