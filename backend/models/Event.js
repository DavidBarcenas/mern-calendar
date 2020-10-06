const { Schema, model, Types } = require('mongoose')

const EventSchema = Schema({
  title: {
    type: String,
    require: true,
  },
  notes: {
    type: String
  },
  start: {
    type: String,
    require: true
  },
  end: {
    type: String,
    require: true
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
})

module.exports = model('Event', EventSchema)