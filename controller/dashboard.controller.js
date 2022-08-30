const model = require('../models/dashboard.models.js')

class dashboardController {
    async dashboard(req, res) {
        const dashboard = await model.dashboard()
        res.json(dashboard)
    }

    async collection(req, res) {
        const collection = await model.collection()
        res.json(collection)
    }

    async tasklist(req, res) {
        const id = req.params.id
        const {all} = req.body
        const tasklist = await model.tasklist(id, all)
        res.json(tasklist)
    }
}

module.exports = new dashboardController()

exports