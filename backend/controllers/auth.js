const { response } = require('express')
const User = require('../models/User')

const createUser = async (req, res = response) => {
  const {email, pwd} = req.body
  try {
    let user = await User.findOne({ email })

    if(user) {
      return res.status(400).json({
        ok: false,
        msg: 'El correo ya está en uso'
      })
    }

    user = new User(req.body);
    await user.save()

    res.status(201).json({
      ok: true,
      uid: user.id,
      name: user.name
    })
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: 'Contacte a su administrador'
    })
  }
}

const loginUser = (req, res = response) => {
  const { email, pwd} = req.body
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