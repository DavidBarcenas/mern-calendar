const { response } = require("express")
const Event = require("../models/Event")

const getEvents = async (req, res) => {
  const events = await Event.find().populate('user', 'name')

  res.json({
    ok: true,
    events
  })
}

const createEvent = async (req, res) => {
  const event = new Event(req.body)

  try {
    event.user = req.uid

    const savedEvent = await event.save()
    res.status(201).json({
      ok: true,
      event: savedEvent
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      ok: false,
      msg: 'Contacte a su administrador'
    })
  }
}

const updateEvent = (req, res) => {
  return res.json({
    ok: true,
    msg: 'updateEvent'
  })
}

const deleteEvent = (req, res) => {
  return res.json({
    ok: true,
    msg: 'deleteEvent'
  })
}


module.exports = {
  getEvents,
  createEvent,
  updateEvent,
  deleteEvent
}