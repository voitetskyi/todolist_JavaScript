const Router = require('express')
const router = new Router()
const listController = require('../controller/list.controller')

router.post('/list', listController.createList)
router.get('/lists', listController.getLists)
router.get('/list/:id', listController.getOneList)
router.patch('/list/:id', listController.updateList)
router.delete('/list/:id', listController.deleteList)

module.exports = router
