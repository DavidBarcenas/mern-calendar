/**
 * User Routes / Auth
 * host + /api/auth
 */

const express = require('express')
const { check } = require('express-validator')
const { createUser, loginUser, reValidateJWT } = require('../controllers/auth')

const router = express.Router()

router.post('/', [
  check('email', 'Email is required and must be valid').isEmail(),
  check('pwd', 'Password must have a minimum of 6 characters').isLength({min: 6}),
], loginUser)

router.post(
  '/new', [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Email is required and must be valid').isEmail(),
    check('pwd', 'Password must have a minimum of 6 characters').isLength({min: 6}),
  ], createUser)
  
router.get(
  '/renew', reValidateJWT)

module.exports = router