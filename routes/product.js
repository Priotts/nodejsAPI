const express = require('express')
const router = express.Router()
const productUtils = require('../utils/product')

router.get('/', productUtils.product)
router.get('/:id', productUtils.getProduct)
router.post('/', productUtils.createProduct)
router.patch('/:id', productUtils.updateProduct)
router.delete('/:id', productUtils.deleteProduct)


module.exports = router