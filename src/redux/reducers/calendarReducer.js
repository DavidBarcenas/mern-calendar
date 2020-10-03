import moment from "moment"
import { types } from "../types/types"

const initialState = {
  events: [{
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

export const calendarReducer = ( state = initialState, action ) => {
  switch ( action.type ) {
    case types.eventAddNew:
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

    default:
      return state
  }
}