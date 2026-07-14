
function taskID() {
    let taskNumber = Number(localStorage.getItem('taskNumber')) || 0
    const id = taskNumber
    taskNumber++
    localStorage.setItem('taskNumber', taskNumber)
    return id
}

export function getAllTasks() {
    const raw = localStorage.getItem("tasks")
    return raw ? JSON.parse(raw) : []
}

export function saveAllTasks(tasks) {
    localStorage.setItem("tasks", JSON.stringify(tasks))
}

export function addTask(text) {
    const tasks = getAllTasks()
    const id = taskID()
    tasks.push({id: id, status: false, text: text })
    saveAllTasks(tasks)
    return id
}

export function editTask(id, text) {
    const tasks = getAllTasks()
    const task = tasks.find(t => t.id === id)
    if (task) {
        task.text = text
        saveAllTasks(tasks)
    }
    return task
}

export function checkTask(id) {
    const tasks = getAllTasks()
    const task = tasks.find(t => t.id === id)
    if (task) {
        task.status = !task.status
        saveAllTasks(tasks)
    }
    return task ? task.status : null
}

export function deleteTask(id) {
    const tasks = getAllTasks()
    const filtered = tasks.filter(t => t.id !== id)
    saveAllTasks(filtered)
}