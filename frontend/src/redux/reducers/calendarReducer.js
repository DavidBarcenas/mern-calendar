import moment from "moment"
import { types } from "../types/types"

const initialState = {
  events: [{
    id: new Date().getTime(),
    title: 'Proyecto nuevo',
    notes: '',
    start: moment().toDate(),
    end: moment().add(2, 'hours').toDate(),
    user: {
      _id: '12354',
      name: 'David Barcenas'
    }
  }],
  activeEvent: null
}

export const calendarReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.addNewEvent:
      return {
        ...state,
        events: [
          ...state.events,
          action.payload
        ]
      }
    
    case types.eventSetActive:
      return {
        ...state,
        activeEvent: action.payload
      }
    
    case types.updateEvent:
      return {
        ...state,
        events: state.events.map(
          e => (e.id === action.payload.id ) ? action.payload : e
        )
      }
    
    case types.deleteEvent:
      return {
        ...state,
        events: state.events.filter(e => e.id !== state.activeEvent.id),
        activeEvent: null
      }

    default:
      return state
  }
}