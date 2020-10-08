import { tokenlessFetch } from "../../utils/fetch"
import { types } from "../types/types"
import { showAlert } from "./ui"

export const startLogin = (email, pwd) => {
  return async (dispatch) => {
    const resp = await tokenlessFetch('auth', {email, pwd}, 'POST')
    const body = await resp.json()

    if(body.ok) {
      localStorage.setItem('token', body.token)
      localStorage.setItem('token-init', new Date().getTime())

      dispatch(login({
        uid: body.uid,
        name: body.name
      }))
    } else {
      dispatch(showAlert('error', body.msg))
    }
  }
}

export const startRegister = (email, pwd, name) => {
  return async (dispatch) => {
    const resp = await tokenlessFetch('auth/new', {email, name, pwd}, 'POST')
    const body = await resp.json()

    if(body.ok) {
      localStorage.setItem('token', body.token)
      localStorage.setItem('token-init', new Date().getTime())

      dispatch(login({
        uid: body.uid,
        name: body.name
      }))
    } else {
      dispatch(showAlert('error', body.msg))
    }
  }
}

const login = (user) => ({
  type: types.authLogin,
  payload: user
})