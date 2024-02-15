const express = require('express')
const router = express.Router()
const userUtils = require('../utils/user')

router.get('/', userUtils.users)
router.post('/', userUtils.createUser)



module.exports = router