const db = require('../db')

class TaskModel {
    async createTask(done, name, description,duedate, list_id) {
        const newTask = await db('tasks')
            .insert({done: done, name: name, description: description, duedate: duedate, list_id: list_id})
            .returning('*')
        return newTask
    }

    async getTasks() {
        const tasks = await db.select('*').from('tasks').returning('*')
        return tasks
    }

    async getOneTask(id) {
        const task = await db.select('*').from('tasks').where('id', '=', id).returning('id')
        return task
    }
    
    async getTasksList(id) {
        const tasks = await db.select('*').from('tasks').where('list_id', '=', id).returning('*')
        return tasks
    }
    
    async updateTask(done, name, description, duedate, list_id, id) {
        if (done !== undefined) {
            const task = await db('tasks').update('done', done).where('id','=', id).returning('*')
            return task
        } else if (name !== undefined) {
            const task = await db('tasks').update('name', name).where('id','=', id).returning('*')
            return task
        } else if (description !== undefined) {
            const task = await db('tasks').update('description', description).where('id','=', id).returning('*')
            return task
        } else if (duedate !== undefined) {
            const task = await db('tasks').update('duedate', duedate).where('id','=', id).returning('*')
            return task
        } else if (list_id !== undefined) {
            const task = await db('tasks').update('list_id', list_id).where('id','=', id).returning('*')
            return task
        } 
    }

    async deleteTask(id) {
        const task = await db('tasks').where('id','=', id).del().returning('*')
        return task
    }
}

module.exports = new TaskModel()

exports