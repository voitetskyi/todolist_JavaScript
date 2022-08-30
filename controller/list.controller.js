const model = require('../models/list.models.js')

class ListController {
    async createList(req, res) {
        const {name} = req.body
        const newList = await model.createList(name)
        res.json(newList)
    }

    async getOneList(req, res) {
        const id = req.params.id
        const list = await model.getOneList(id)
        res.json(list)
    }

    async getLists(req, res) {
        const lists = await model.getLists()
        res.json(lists)
    }

    async updateList(req, res) {
        const id = req.params.id
        const {list_id, name} = req.body
        const list = await model.updateList(name, id)
        res.json(list)
    }

    async deleteList(req, res) {
        const id = req.params.id
        const list = await model.deleteList(id)
        res.json(list)
    }
}


module.exports = new ListController()

exports