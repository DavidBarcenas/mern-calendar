import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Calendar, momentLocalizer } from 'react-big-calendar'
import { Navbar } from '../ui/Navbar'
import { messages_es } from '../../utils/messages-es'
import { CalendarEvent } from './CalendarEvent'
import { CalendarModal } from './CalendarModal'
import { uiOpenModal } from '../../redux/actions/ui'
import { eventSetActive } from '../../redux/actions/events'
import { Fab, Icon } from '@material-ui/core'
import { eventFormat } from '../../utils/format'
import moment from 'moment'

import 'moment/locale/es-mx'
import 'react-big-calendar/lib/css/react-big-calendar.css'

moment.locale('es-mx')
const localizer = momentLocalizer(moment)
const formats = { 
  timeGutterFormat: 'h a', 
  eventTimeRangeFormat: ({ start, end }) =>
  moment(start).format('h:mma') + ' - ' + moment(end).format('h:mma')
}

export const CalendarScreen = () => {

  const dispatch = useDispatch()
  const { events, activeEvent } = useSelector(state => state.calendar)
  const [lastView, setLastView] = useState( localStorage.getItem('lastView') || 'month' )
  
  const onDoubleClick = (e) => {
    dispatch( uiOpenModal() )
  }
  
  const onSelectEvent = (e) => {
    dispatch(eventSetActive(e))
  }

  const onViewChange = (e) => {
    setLastView(e)
  }

  const handleSelectSlot = (e) => {
    let event = eventFormat(e)
    if( e.action === 'doubleClick' && !activeEvent ) {
      event.slot = true
      dispatch(eventSetActive(event))
      dispatch( uiOpenModal() )
    }
  }

  const btnAddNew = () => {
    dispatch( uiOpenModal() )
  }

  const eventStyleGetter = (event, start, end, isSelected) => {
    const style = {
      backgroundColor: '#396afc',
      borderLeft: '3px solid #396afc',
      borderRadius: '0',
      color: '#ffffff',
      display: 'block',
      fontSize: '14px',
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
          events={ events }
          startAccessor="start"
          endAccessor="end"
          messages={ messages_es }
          eventPropGetter={ eventStyleGetter }
          onDoubleClickEvent={ onDoubleClick }
          onSelectEvent={ onSelectEvent }
          onView={ onViewChange }
          onSelectSlot={ handleSelectSlot }
          selectable={ true }
          view={ lastView }
          components={{
            event: CalendarEvent
          }}
        />
      </div>

      <CalendarModal />

      <Fab color="primary" aria-label="add" className="btn-new" onClick={ btnAddNew }>
        <Icon>add</Icon>
      </Fab>
    </div>
  )
}
