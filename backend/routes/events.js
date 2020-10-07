/**
 * User Routes / Events
 * host + /api/events
 */

const express = require('express')
const { check } = require('express-validator')
const { getEvents, createEvent, updateEvent, deleteEvent } = require('../controllers/events')
const { validateFields } = require('../middlewares/validate-fields')
const { validateJWT } = require('../middlewares/validate-jwt')
const { isDate } = require('../utils/isDate')


const router = express.Router()
router.use(validateJWT)

router.get('/', getEvents)

router.post('/', [
  check('title', 'Titulos es requerido').not().isEmpty(),
  check('start', 'Fecha de inciio es requerida').custom(isDate),
  validateFields
], createEvent)

router.put('/:id', updateEvent)
router.delete('/:id', deleteEvent)

module.exports = router;