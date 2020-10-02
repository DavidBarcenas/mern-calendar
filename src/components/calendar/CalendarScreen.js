import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Calendar, momentLocalizer } from 'react-big-calendar'
import { Navbar } from '../ui/Navbar'
import { messages_es } from '../../utils/messages-es'
import { CalendarEvent } from './CalendarEvent'
import { CalendarModal } from './CalendarModal'
import moment from 'moment'

import 'moment/locale/es-mx'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import { uiCloseModal, uiOpenModal } from '../../redux/actions/ui'

moment.locale('es-mx')
const localizer = momentLocalizer(moment)
const formats = { timeGutterFormat: 'h A' }

const myEventsList = [{
  title: 'Proyecto nuevo',
  start: moment().toDate(),
  end: moment().add(2, 'hours').toDate(),
  user: {
    _id: '12354',
    name: 'David Barcenas'
  }
}]

export const CalendarScreen = () => {

  const dispatch = useDispatch()
  const [lastView, setLastView] = useState( localStorage.getItem('lastView') || 'month' )
  
  const onDoubleClick = (e) => {
    console.log('abrir modal')
    dispatch( uiOpenModal() )
  }
  
  const onSelectEvent = (e) => {
    console.log('onSelect', e)
  }

  const onViewChange = (e) => {
    setLastView(e)
    localStorage.setItem('lastView', e)
  }

  const closeModal = () => {
    console.log('cerrar modal')
    dispatch( uiCloseModal() )
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
          onDoubleClickEvent={ onDoubleClick }
          onSelectEvent={ onSelectEvent }
          onView={ onViewChange }
          view={ lastView }
          components={{
            event: CalendarEvent
          }}
        />
      </div>

      <CalendarModal closeModal={ closeModal } />
    </div>
  )
}
