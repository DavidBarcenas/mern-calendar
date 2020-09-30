import React from 'react'
import moment from 'moment'
import { Calendar, momentLocalizer } from 'react-big-calendar'
import { Navbar } from '../ui/Navbar'
import { messages_es } from '../../utils/messages-es'

import 'moment/locale/es-mx'
import 'react-big-calendar/lib/css/react-big-calendar.css'

moment.locale('es-mx')
const localizer = momentLocalizer(moment)


export const CalendarScreen = () => {
  const myEventsList = [{
    title: 'Proyecto nuevo',
    start: moment().toDate(),
    end: moment().toDate(),
  }]
  
  const formats = {
    timeGutterFormat: 'h A'
  }

  const eventStyleGetter = (event, start, end, isSelected) => {
    const style = {
      backgroundColor: '#3766FC',
      borderRadius: '0',
      color: '#ffffff',
      display: 'block',
      opacity: 0.8,
    }

    return { style }
  }

  return (
    <div className="calendar__wrapper">
      <Navbar />

      <div>
        <Calendar
          formats={ formats }
          localizer={ localizer }
          events={ myEventsList }
          startAccessor="start"
          endAccessor="end"
          messages={ messages_es }
          eventPropGetter={ eventStyleGetter }
        />
      </div>
    </div>
  )
}
