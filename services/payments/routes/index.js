const PaymentController = require('../controllers/PaymentController')
const router = require('express').Router()

router.post('/:order_id', PaymentController.store)

module.exports = router
