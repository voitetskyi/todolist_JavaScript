const Router = require('express')
const router = new Router()
const dashboardController = require('../controller/dashboard.controller')

router.get('/dashboard', dashboardController.dashboard)
router.get('/collection/today', dashboardController.collection)
router.get('/list/:id/tasks', dashboardController.tasklist)

module.exports = router