import { tokenFetch, tokenlessFetch } from "../../utils/fetch"
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

export const startChecking = () => {
  return async (dispatch) => {
    const resp = await tokenFetch('auth/renew')
    const body = await resp.json()

    if(body.ok) {
      localStorage.setItem('token', body.token)
      localStorage.setItem('token-init', new Date().getTime())

      dispatch(login({
        uid: body.uid,
        name: body.name
      }))
    } else {
      dispatch(observableFinish())
    }
  }
}

const observableFinish = () => ({
  type: types.authObservableNext
})

const login = (user) => ({
  type: types.authLogin,
  payload: user
})

export const startLogout = () => {
  return (dispatch) => {
    localStorage.clear()
    dispatch(logout())
  }
} 

const logout = () => ({type: types.authLogout})