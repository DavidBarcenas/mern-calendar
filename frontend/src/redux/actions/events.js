import { tokenFetch } from "../../utils/fetch";
import { parseEvents } from "../../utils/format";
import { types } from "../types/types";

export const startSavingEvent = (event) => {
  return async (dispatch, getState) => {

    const { user } = getState().auth
    
    try {
      const resp = await tokenFetch('events', event, 'POST')
      const body = await resp.json()

      if(body.ok) {
        event.id = body.event.id
        event.user = {
          _id: user.uid,
          name: user.name
        }
        dispatch(addNewEvent(event))
      }

    } catch (error) {
      console.log(error)
    }
  }
}

const addNewEvent = (event) => ({ 
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

export const getStartEvent = () => {
  return async (dispatch) => {
    try {
      const resp = await tokenFetch('events')
      const body = await resp.json()

      if(body.ok) {
        dispatch(getEvents(parseEvents(body.events)))
      }
      
    } catch (error) {
      console.log(error)
    }
  }
}

const getEvents = (events) => ({
  type: types.getAllEvents,
  payload: events
})