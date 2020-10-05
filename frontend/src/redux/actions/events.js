import { types } from "../types/types";

export const addNewEvent = (event) => ({ 
  type: types.addNewEvent, 
  payload: event 
})

export const eventSetActive = (event) => ({ 
  type: types.eventSetActive, 
  payload: event 
})

export const updateEvent = (event) => ({ 
  type: types.updateEvent, 
  payload: event 
})

export const deleteEvent = () => ({type: types.deleteEvent})