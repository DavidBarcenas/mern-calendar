import { types } from "../types/types"

const initialState = {
  events: [],
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
    
    case types.getAllEvents:
      return {
        ...state,
        events: [...action.payload],
      }
    case types.logoutEvent:
      return {
        ...initialState
      }

    default:
      return state
  }
}