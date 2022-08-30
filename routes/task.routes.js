const Router = require('express')
const router = new Router()
const taskController = require('../controller/task.controller')

router.post('/task', taskController.createTask)
router.get('/tasks', taskController.getTasks)
router.get('/tasks/:id', taskController.getTasksList)
router.get('/task/:id', taskController.getOneTask)
router.patch('/task/:id', taskController.updateTask)
router.delete('/task/:id', taskController.deleteTask)

module.exports = router