const { response } = require('express')
const { validationResult } = require('express-validator')


const validateFields = (req, res = response, next) => {
  // Handle errors
  const errors = validationResult(req)

  if(!errors.isEmpty()) {
    return res.status(400).json({
      ok: false,
      error: errors.mapped()
    })
  }
  next()
}

module.exports = {
  validateFields
}