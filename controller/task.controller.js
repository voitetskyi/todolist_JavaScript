const model = require('../models/task.models.js')

class TaskController {
    async createTask(req, res) {
        const {done, name, description, duedate, list_id} = req.body
        const newTask = await model.createTask(done, name, description, duedate, list_id)
        res.json(newTask)
    }

    async getOneTask(req, res) {
        const id = req.params.id
        const task = await model.getOneTask(id)
        res.json(task)
    }

    async getTasks(req, res) {
        const tasks = await model.getTasks()
        res.json(tasks)
    }

    async updateTask(req, res) {
        const id = req.params.id
        const {done, name, description, duedate, list_id} = req.body
        const task = await model.updateTask(done, name, description, duedate, list_id, id)
        res.json(task)
    }

    async deleteTask(req, res) {
        const id = req.params.id
        const task = await model.deleteTask(id)
        res.json(task)        
    }

    async getTasksList(req, res) {
        const id = req.params.id
        const tasks = await model.getTasksList(id)
        res.json(tasks)
    }
}

module.exports = new TaskController()

exports
