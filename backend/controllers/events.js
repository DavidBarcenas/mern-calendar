
const getEvents   = (req, res, next) => {
  return res.json({
    ok: true,
    msg: 'GetEvents'
  })
}

const createEvent = (req, res, next) => {

  console.log(req.body)

  return res.json({
    ok: true,
    msg: 'createEvent'
  })
}

const updateEvent = (req, res, next) => {
  return res.json({
    ok: true,
    msg: 'updateEvent'
  })
}

const deleteEvent = (req, res, next) => {
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