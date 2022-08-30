const db = require('../db')

class DashboardModel {
    async dashboard() {
        let today = await db.raw('SELECT COUNT(*)::INT AS today FROM tasks WHERE duedate = CURRENT_DATE')
        let count = await db.raw('SELECT lists.id, lists.name, COUNT(t.id)::INT AS undone FROM (SELECT * FROM tasks) as t RIGHT JOIN lists ON t.list_id=lists.id AND t.done=false GROUP BY lists.id ORDER BY lists.id;')
        const result = Object.assign(today.rows[0], {'lists:': count.rows})
        return result
    }

    async collection() {

        const collection = await db.raw('SELECT tasks.id, tasks.done, tasks.name, tasks.description, lists.name FROM tasks, lists WHERE tasks.duedate=CURRENT_DATE AND tasks.list_id=lists.id;')
        
        return collection.rows
    }

    async tasklist(id, all) {
        if (all === 'true') {
            const tasklist = await db.select('*').from('tasks').where('list_id', '=', id)
            return tasklist
        } else {
            const tasklist = await db.select('*').from('tasks').where('list_id', '=', id).andWhere('done', '=', false)
            return tasklist
        }
    }
}

module.exports = new DashboardModel()

exports