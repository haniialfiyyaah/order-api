const ProductController = require('../controllers/ProductController')
const router = require('express').Router()

router.post('/', ProductController.store)
router.get('/', ProductController.index)
router.get('/:id', ProductController.show)
router.put('/:id', ProductController.update)
router.delete('/:id', ProductController.destroy)

module.exports = router
