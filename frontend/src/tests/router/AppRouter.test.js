import '@testing-library/jest-dom';
import { mount } from 'enzyme';
import React from 'react'
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk';
import { AppRouter } from '../../router/AppRouter';

const middlewares = [thunk]
const mockStore = configureStore(middlewares)

describe('<AppRouter /> testing', () => {
  test('should show a blank div', () => {
    const initState = {
      auth: {
        observable: true,
        user: null
      }
    }
    const store = mockStore(initState)
    const wrapper = mount(
      <Provider store={store}>
        <AppRouter />
      </Provider>
    )

    expect(wrapper).toMatchSnapshot()
  })
  
  test('should show the public route', () => {
    const initState = {
      auth: {
        observable: false,
        user: null
      }
    }
    const store = mockStore(initState)
    const wrapper = mount(
      <Provider store={store}>
        <AppRouter />
      </Provider>
    )

    expect(wrapper).toMatchSnapshot()
    expect(wrapper.find('.login__wrapper').exists()).toBeTruthy()
  })
  
  test('should show the private route', () => {
    const initState = {
      ui: {
        modalOpen: false
      },
      auth: {
        observable: false,
        user: '1231das',
        name: 'Davee'
      }, 
      calendar: {
        events: [],
        activeEvent: {}
      }
    }
    const store = mockStore(initState)
    const wrapper = mount(
      <Provider store={store}>
        <AppRouter />
      </Provider>
    )

    expect(wrapper).toMatchSnapshot()
    expect(wrapper.find('.calendar__wrapper').exists()).toBeTruthy()
  })
  
})
