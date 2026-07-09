/* 
    # Core Methods
    - localStorage.setItem('key', 'value'): Saves data to local storage.
    - localStorage.getItem('key'): Retrieves data using the key.
    - localStorage.removeItem('key'): Deletes a specific key-value pair.
    - localStorage.clear(): Removes all stored data for that domain.
 */

/* 
// 1. Store a single string
localStorage.setItem('username', 'Alex')
    
// 2. Retrieve the string
const user = localStorage.getItem('username')
console.log(user) // Output: Alex
    
// 3. Store an object (must be converted to a string)
const settings = { theme: 'dark', notifications: true }
localStorage.setItem('userSettings', JSON.stringify(settings))
  
// 4. Retrieve and parse the object
const savedSettings = localStorage.getItem('userSettings')
const parsedSettings = JSON.parse(savedSettings)
console.log(parsedSettings.notifications) // Output: dark
*/

export function getAllTasks() {
    const raw = localStorage.getItem("tasks")
    return raw ? JSON.parse(raw) : []
}

export function saveAllTasks(tasks) {
    localStorage.setItem("tasks", JSON.stringify(tasks))
}

export function getTasks(index) {
    const taskList = localStorage.getItem("tasks")
    const parsedTaskList = JSON.parse(taskList)
    console.log(parsedTaskList[index])
}

export function addTask(text) {
    const tasks = getAllTasks()
    tasks.push({ status: false, text: text })
    saveAllTasks(tasks)
}

export function editTask(index, text) {
    const tasks = getAllTasks()
    tasks[index].text = text
    saveAllTasks(tasks)
}

export function checkTask(index) {
    const tasks = getAllTasks()
    tasks[index].status ? tasks[index].status = false : tasks[index].status = true
    saveAllTasks(tasks)
}