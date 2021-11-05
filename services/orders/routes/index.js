const OrderController = require('../controllers/OrderController')
const router = require('express').Router()

router.post('/', OrderController.store)
router.get('/:id', OrderController.show)
router.put('/:id', OrderController.update)

module.exports = router
