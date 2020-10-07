import { types } from "../types/types";

export const uiOpenModal  = () => ({type: types.uiOpenModal})
export const uiCloseModal = () => ({type: types.uiCloseModal})

export const showAlert = (typeAlert, message) => ({
  type: types.uiShowAlert,
  payload: {
    typeAlert,
    message
  }
})

export const clearAlert = () => ({type: types.uiClearAlert})