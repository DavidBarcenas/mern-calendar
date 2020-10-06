const mongoose = require('mongoose');

const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.DB_CNN, {
      useNewUrlParser: true, 
      useUnifiedTopology: true,
      useCreateIndex: true
    });
    console.log('DB Online')
  } catch(err) {
    console.warn(err)
    throw new Error('Error in connect db')
  }
}

module.exports = {
  dbConnection
}