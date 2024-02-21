const express = require('express')
const router = express.Router()
const orderUtils = require('../utils/order')

router.get('/', orderUtils.order)
router.get('/:id', orderUtils.getOrder)
router.post('/', orderUtils.createOrder)
router.patch('/:id', orderUtils.updateOrder)
router.delete('/:id', orderUtils.deleteOrder)
router.get('/product/:name', orderUtils.filterByProduct)
router.get('/date/:data', orderUtils.filterByDate)

module.exports = router