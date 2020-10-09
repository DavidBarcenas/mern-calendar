import '@testing-library/jest-dom';
import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk';
import { startLogin } from '../../redux/actions/auth';
import { types } from '../../redux/types/types'

const middlewares = [thunk]
const mockStore = configureStore(middlewares)

const initState = {}
let store = mockStore(initState)

Storage.prototype.setItem = jest.fn()

describe('actions testing', () => {
  beforeEach(() => {
    store = mockStore(initState)
    jest.clearAllMocks()
  })

  test('it should save the token and trigger the login', async () => {
    await store.dispatch(startLogin('davee@gmail.com', 'dave123'))
    const actions = store.getActions()

    expect(actions[0]).toEqual({
      type: types.authLogin,
      payload: {
        uid: expect.any(String),
        name: expect.any(String)
      }
    })

    expect(localStorage.setItem).toHaveBeenCalledWith('token', expect.any(String))
    expect(localStorage.setItem).toHaveBeenCalledWith('token-init', expect.any(Number))

    // token = localStorage.setItem.mock.calls[0][1]
  })
    

  test('startLogin should be wrong', async () => {
    await store.dispatch(startLogin('davee@gmail.com', 'dave12334'))
    const actions = store.getActions()

    expect(actions[0]).toEqual({
      type: types.uiShowAlert,
      payload: {
        typeAlert: 'error',
        message: 'El correo o la contraseña es incorrecto'
      }
    })
  })
  
})
