import { types } from "../types/types";

const initialState = {
  modalOpen: false,
  snackbarOpen: false,
  snackbarMsg: null,
  snackbarType: null
}

export const uiReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.uiOpenModal:
      return {
        ...state,
        modalOpen: true
      }

    case types.uiCloseModal:
      return {
        ...state,
        modalOpen: false
      }
    
    case types.uiShowAlert:
      return {
        ...state,
        snackbarOpen: true,
        snackbarMsg: action.payload.message,
        snackbarType: action.payload.typeAlert
      }
    
    case types.uiClearAlert:
      return {
        ...state,
        snackbarOpen: false,
        snackbarMsg: null,
        snackbarType: null
      }

    default:
      return state;
  }
}