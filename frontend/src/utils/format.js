import moment from "moment"

export const dateFormat = (date) => {
  if(moment(date).isValid()) {
    const dateForInput = moment(date).format().substring(0,19)
    return dateForInput;
  }
  return '';
}

export const eventFormat = (e, user) => ({
  id: new Date().getTime(),
  title: e.title || '',
  notes: e.notes || '',
  start: dateFormat(e.start) || '',
  end: dateFormat(moment(e.start).add(1, 'hours')) || '',
  slot: false,
  user: {
    _id: '12354',
    name: 'David Barcenas'
  }
})

export const parseEvents = (events = []) => {
  return events.map(event => ({
    ...event,
    start: moment(event.start).toDate(),
    end: moment(event.end).toDate()
  }))
}