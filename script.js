class Tasks {
    constructor(done, name, description, duedate, list_name, id) {
        this.done = done
        this.name = name
        this.description = description
        this.duedate = new Date(duedate)
        this.list_name = list_name
        this.id = id
    }
}
let tasks = [
    new Tasks(false, 'Пройти опитування', 'Пройти опитування', '2022-09-09', 'Тренінг з безпеки', 1),
    new Tasks(true, 'Реєстрація на TechTalk', 'Зареєструватись на TechTalk, який пройде 25.08.22 о 09:00. Поговоримо про багаторічну традицію нашої компанії — шаринг знань та традиційний івент з багаторічною історією.', '2022-09-09', 'Івенти', 2),
    new Tasks(false, 'Реєстрація на MeetUp', 'Зареєструватись на MeetUp, який пройде 22.09.22 о 18:00', '2022-08-23', 'Івенти', 3),
    new Tasks(false, 'Пройти опитування', 'Пройти опитування', '2022-09-09', 'Test', 4),
    new Tasks(true, 'Реєстрація на TechTalk', 'Зареєструватись на TechTalk, який пройде 25.08.22 о 09:00.', '2022-09-09', 'Test', 5),
    new Tasks(false, 'Реєстрація на MeetUp', 'Зареєструватись на MeetUp, який пройде 22.09.22 о 18:00', '2022-08-23', 'Test', 6)

]
let lists = [
    {id: 1, name: 'Тренінг з безпеки'},
    {id: 2, name: 'Івенти'},
    {id: 3, name: 'Test'}
]
let today = new Date

const listsElement = document.getElementById('container')
const listsBar = document.getElementById('lists')
const cont = document.querySelector("#container")
const select = document.getElementById('select')
const addTaskFormElement = document.getElementById('addTaskForm')

function appendListToBar (list) {
    let {id, name} = list
    listsBar.innerHTML += `<div class="side_list" id="list_${id}">${name}</div>`
    select.innerHTML += `<option>${name}</option>`
}

function appendList(task) {
    let {done, name, description, duedate, list_name, id} = task
    let check = document.getElementsByName(list_name)
    if (check.length === 0) {
        listsElement.innerHTML += `<div class="tasks_list" name="${list_name}" id="${list_name.replace(/[.,\/#!$%\^&\*;:{}=\-_ `~()]/g,"")}"><h2>${list_name}</h2></div>`
    }
}
function appendTask(task) {
    let {done, name, description, duedate, list_name, id} = task
    console.log(done, name, description, duedate, list_name, id)
    const tasksElement = document.getElementById(list_name.replace(/[.,\/#!$%\^&\*;:{}=\-_ `~()]/g,""))
    console.log(tasksElement)
    let hr_color = ''
    if (done) {
        hr_color = '#58AC83'
    } else if (today > duedate && done === false) {
        hr_color = '#E63241'
    } else {
        hr_color = '#D9D9D9'
    }
    let h4_color =''
    if (today > duedate && done === false) {
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
    duedate = duedate.toLocaleDateString()
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

function deleteTask (id) {
    let task = document.getElementById(id.toString())
    task.remove()
    let i = 0
    let arr = []
    for (item of tasks) {
        if (item.id === id) {
            console.log('remove: ', id);
        } else {arr.push(item)}
        i++
    }
    tasks = arr
}

function changeDone (id) {
    let i = 0
    for (item of tasks) {
        if (item.id === id) {
            console.log('checkbox changed: ', id);
            item.done = !item.done
            deleteTask(id)
            appendTask(item)
        }
        i++
    }
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
    let id = tasks.length + 1
    const task = new Tasks(false, obj.taskname, obj.textarea, obj.duedate, obj.select, id);
    tasks.push(task)
    appendTask(task)
    closeAddTaskForm()
    taskForm.reset()
}) 

lists.forEach(appendListToBar)
tasks.forEach(appendList)
tasks.forEach(appendTask)