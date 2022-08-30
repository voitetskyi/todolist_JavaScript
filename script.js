class Task  {
    constructor (done, name, description, duedate, list_id, id) {
        this.done = done
        this.name = name
        this.description = description
        this.duedate = duedate
        this.list_id = list_id
        this.id = id
    }
}

let today = new Date

const listsElement = document.getElementById('container')
const listsBar = document.getElementById('lists')
const cont = document.querySelector("#container")
const select = document.getElementById('select')
const addTaskFormElement = document.getElementById('addTaskForm')

let lists_map = new Map()
lists_map.set('Завдання без списку', 0)

function appendList(list) {
    let {name, id} = list
    listsElement.innerHTML += `<div class="tasks_list" id="${id + 'list_id'}"><h2>${name}</h2></div>`
    listsBar.innerHTML += `<div class="side_list" id="side_list${id}">${name}</div>`
    select.innerHTML += `<option>${name}</option>`
    lists_map.set(name, id)
}

function appendTask(task) {
    // console.log(task)
    let {done, name, description, duedate, list_id, id} = task
    console.log(done, name, description, duedate, list_id, id)
    const tasksElement = document.getElementById((list_id !== null ? list_id : 0) + 'list_id')
    // console.log(tasksElement)
    let hr_color = ''
    if (done) {
        hr_color = '#58AC83'
    } else if (today > duedate && done === false && duedate !== null) {
        hr_color = '#E63241'
    } else {
        hr_color = '#D9D9D9'
    }
    let h4_color =''
    if (today > duedate && done === false && duedate !== null) {
        h4_color = '#E63241'
    } else {
        h4_color = '#878787'
    }
    let checked = ''
    let status = 'undone'
    if (done) {
        checked = 'checked'
        status = 'done'
    }
    if (duedate === null) {
        duedate = ''
    } else duedate = new Date(duedate).toLocaleDateString()
    tasksElement.innerHTML += `<div class="task ${status}" id="${id}">
            <hr color="${hr_color}">
            <img class="trash" align="right" title="Видалити завдання"src="icons/trash21.png" onclick="deleteTask(${id})">
            <h4 style="color:${h4_color}"><svg  width="14" height="14" style="padding-right: 8px; padding-bottom: 0px;" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path stroke="currentColor" d="M10.4998 2.33325H3.49984C2.21117 2.33325 1.1665 3.37792 1.1665 4.66659V10.4999C1.1665 11.7886 2.21117 12.8333 3.49984 12.8333H10.4998C11.7885 12.8333 12.8332 11.7886 12.8332 10.4999V4.66659C12.8332 3.37792 11.7885 2.33325 10.4998 2.33325Z" stroke="#878787" stroke-linecap="round" stroke-linejoin="round"/>
                    <path stroke="currentColor" d="M4.6665 1.16663V3.49996M9.33317 1.16663V3.49996M1.1665 5.83329H12.8332" stroke="#878787" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>${duedate}
            </h4>
            <h3><input type="checkbox" ${checked} onclick="changeDone(${id})">${name}</h3>
            <p>${description}</p>
        </div>`
}

// function deleteTask (id) {
//     let task = document.getElementById(id.toString())
//     task.remove()
//     let arr = []
//     for (item of tasks) {
//         if (item.id === id) {
//             console.log('remove: ', id);
//         } else {arr.push(item)}
//     }
//     tasks = arr
// }

function changeDone (id) {
    let status = false
    if (document.getElementById(id.toString()).className === 'task undone') status = true
    const task = new Task(status, undefined, undefined, undefined, undefined, id)
    updateTask(id, task)
}

function show_done_tasks () {
    cont.classList.toggle("show-done")
}

const taskForm = document.forms['task']

function closeAddTaskForm () {
    addTaskFormElement.classList.toggle("hide_form")
    taskForm.reset()
}

taskForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const formData = new FormData(taskForm);
    const obj = Object.fromEntries(formData.entries())
    console.log(obj);
    // console.log(lists_map);
    // console.log(lists_map.get(obj.select))
    const task = new Task(false, obj.taskname, obj.textarea, (obj.duedate !== '' ? obj.duedate : undefined), (lists_map.get(obj.select) !== 0 ? lists_map.get(obj.select) : undefined))
    // console.log(task);
    createTask(task)
    .then(closeAddTaskForm())
})

const taskEndpoint = 'http://localhost:8080/api/task'

function createTask(task) {
    return fetch(taskEndpoint, {
        method: 'POST', 
        headers:  {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(task)
    })
    .then(response => response.json())
    .then(task => {
        console.log(task[0])
        appendTask(task[0])
    })
}

function updateTask(id, task) {
    return fetch(taskEndpoint + '/' + id, {
        method: 'PATCH', 
        headers:  {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(task)
    })
    .then(response => response.json())
    .then(task => {
        document.getElementById(id.toString()).remove()
        console.log(task[0])
        appendTask(task[0])
    })
}

function deleteTask(id) {
    return fetch(taskEndpoint + '/' + id, {
        method: 'DELETE'
        // headers:  {
        //     'Content-Type': 'application/json'
        // },
        // body: JSON.stringify(task)
    })
    .then(response => response.json())
    .then(task => {
        document.getElementById(id.toString()).remove()
        // console.log(task[0])
    })
}

const listsEndpoint = 'http://localhost:8080/api/lists'

fetch(listsEndpoint)
    .then(response => response.json())
    .then(tasks => {
        tasks.forEach(appendList)
    })

const tasksEndpoint = 'http://localhost:8080/api/tasks'

fetch(tasksEndpoint)
    .then(response => response.json())
    .then(tasks => {
        tasks.forEach(appendTask)
    })
