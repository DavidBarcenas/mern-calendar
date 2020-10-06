const { response } = require('express')
const bcrypt = require('bcryptjs')
const User = require('../models/User')
const { generateJWT } = require('../utils/jwt')

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

    const salt = bcrypt.genSaltSync()
    user.pwd = bcrypt.hashSync(pwd, salt)

    await user.save()
    const token = await generateJWT(user.id, user.name)

    res.status(201).json({
      ok: true,
      uid: user.id,
      name: user.name,
      token
    })
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: 'Contacte a su administrador'
    })
  }
}

const loginUser = async (req, res = response) => {
  const { email, pwd} = req.body

  try {
    const user = await User.findOne({ email })

    if(!user) {
      return res.status(400).json({
        ok: false,
        msg: 'El usuario no existe'
      })
    }

    const validPwd = bcrypt.compareSync(pwd, user.pwd)

    if(!validPwd) {
      return res.status(400).json({
        ok: false,
        msg: 'El correo o la contraseña es incorrecto'
      })
    }

    // JWT
    const token = await generateJWT(user.id, user.name)

    res.status(200).json({
      ok: true,
      uid: user.id,
      name: user.name,
      token
    })
    
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: 'Contacte a su administrador'
    })
  }
}

const reValidateJWT = async (req, res = response) => {
  const token = await generateJWT(req.uid, req.name)

  res.json({
    ok: true,
    token
  })
}

module.exports = {
  createUser,
  loginUser,
  reValidateJWT
}