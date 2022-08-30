const db = require('../db')

class ListModel {
    async createList (name) {
        const data = await db('lists').insert({name: name}).returning('*')
        return data
    }

    async getLists() {
        const lists = await db.select('*').from('lists').returning('id')
        return lists
    }

    async getOneList(id) {
        const list = await db.select('*').from('lists').where('id', '=', id).returning('*')
        return list
    }

    async updateList (name, id) {
        const data = await db('lists').update('name', name).where('id','=', id).returning('*')
        return data
    }

    async deleteList(id) {
        const list = await db('lists').where('id','=', id).del().returning('*')
        return list
    }
}

module.exports = new ListModel()

exports 
