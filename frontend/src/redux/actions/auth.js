import { tokenlessFetch } from "../../utils/fetch"
import { types } from "../types/types"

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
    }
  }
}

const login = (user) => ({
  type: types.authLogin,
  payload: user
})