import '@testing-library/jest-dom';
import { mount } from 'enzyme';
import React from 'react'
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk';
import { LoginScreen } from '../../../components/auth/LoginScreen';

const middlewares = [thunk]
const mockStore = configureStore(middlewares)

const initState = {
}

const store = mockStore(initState)
store.dispatch = jest.fn()

const wrapper = mount(
  <Provider store={store}>
    <LoginScreen />
  </Provider>
)

describe('<LoginSreen /> testing', () => { 
  test('should render correctly', () => {
    expect(wrapper).toMatchSnapshot()
  })

  // TODO: test Register
})
