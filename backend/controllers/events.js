const { response } = require("express")
const Event = require("../models/Event")

const getEvents = async (req, res) => {
  const events = await Event.find().populate('user', 'name')

  res.status(200).json({
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
    res.status(500).json({
      ok: false,
      msg: 'Contacte a su administrador'
    })
  }
}

const updateEvent = async (req, res) => {
  const eventId = req.params.id;
  const uid = req.uid

  try {
    const event = await Event.findById(eventId)

    if(!event) {
      res.status(404).json({
        ok: false,
        msg: 'El evento no existe'
      })
    }

    if(event.user.toString() !== uid) {
      return res.status(401).json({
        ok: false,
        msg: 'No tiene privilegios para editar este evento'
      })
    }

    const newEvent = {
      ...req.body,
      user: uid
    }

    const updatedEvent = await Event.findByIdAndUpdate(eventId, newEvent, {new: true})
    res.json({
      ok: true,
      event: updatedEvent
    })
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: 'Contacte a su administrador'
    })
  }
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