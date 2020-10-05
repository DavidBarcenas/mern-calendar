const express = require('express')
require('dotenv').config()

// Create express server
const app = express()

// Public folder
app.use(express.static('public'))

// listen port
app.listen(process.env.PORT, () => {
  console.log('Run server in port', process.env.PORT)
})