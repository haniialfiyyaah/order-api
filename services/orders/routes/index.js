const OrderController = require('../controllers/OrderController')
const router = require('express').Router()

router.post('/', OrderController.store)

module.exports = router
