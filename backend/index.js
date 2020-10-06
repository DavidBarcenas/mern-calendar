const express = require('express')
const { dbConnection } = require('./db/config')
require('dotenv').config()

// Create express server
const app = express()

// Conect db
dbConnection()

//  Body parse
app.use(express.json())

// Public folder
app.use(express.static('public'))

// Routes
app.use('/api/auth', require('./routes/auth'))

// listen port
app.listen(process.env.PORT, () => {
  console.log('Run server in port', process.env.PORT)
})