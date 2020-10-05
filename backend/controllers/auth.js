const { response } = require('express')

const createUser = (req, res = response) => {
  res.json({
    ok: true,
    msg: 'register'
  })
}

const loginUser = (req, res = response) => {
  res.json({
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