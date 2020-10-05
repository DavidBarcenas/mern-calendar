const { response } = require('express')
const { validationResult } = require('express-validator')

const createUser = (req, res = response) => {
  const {name, email, pwd} = req.body

  // Handle errors
  const errors = validationResult(req)

  if(!errors.isEmpty()) {
    return res.status(400).json({
      ok: false, 
      error: errors.mapped()
    })
  }

  res.status(201).json({
    ok: true,
    msg: 'register',
    user: req.body
  })
}

const loginUser = (req, res = response) => {
  const { email, pwd} = req.body

  // Handle errors
  const errors = validationResult(req)

  if(!errors.isEmpty()) {
    return res.status(400).json({
      ok: false,
      error: 'The email or password are not valid'
    })
  }

  res.status(200).json({
    ok: true,
    msg: 'login'
  })
}

const reValidateJWT = (req, res = response) => {
  res.json({
    ok: true,
    msg: 'JWT revalidate'
  })
}

module.exports = {
  createUser,
  loginUser,
  reValidateJWT
}