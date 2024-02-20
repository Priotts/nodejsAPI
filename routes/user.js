const express = require('express')
const router = express.Router()
const userUtils = require('../utils/user')

router.get('/', userUtils.users)
router.post('/', userUtils.createUser)
router.get('/:id', userUtils.getUser)
router.patch('/:id', userUtils.updateUser)
router.delete('/:id', userUtils.deleteUser)

module.exports = router