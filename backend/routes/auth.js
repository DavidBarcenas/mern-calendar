/**
 * User Routes / Auth
 * host + /api/auth
 */

const express = require('express')
const { createUser, loginUser, reValidateJWT } = require('../controllers/auth')

const router = express.Router()

router.post('/', loginUser)
router.post('/new', createUser)
router.post('/renew', reValidateJWT)

module.exports = router