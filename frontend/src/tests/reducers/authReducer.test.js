import '@testing-library/jest-dom';
import { authReducer } from '../../redux/reducers/authReducer';
import { types } from '../../redux/types/types';

const initState = {
  observable: false
}

describe('authReducer testing', () => {
  test('it should return the state default', () => {
    const action = {}
    const state = authReducer(initState, action)
    expect(state).toEqual(initState)
  })

  test('should authenticate the user', () => {
    const action = {
      type: types.authLogin,
      payload: {
        uid: 'asd123',
        name: 'Daveepro'
      }
    }

    const state = authReducer(initState, action)
    expect(state).toEqual({
      observable: false,
      user: {
        uid: 'asd123',
        name: 'Daveepro'
      }
    })
  })
  
})
