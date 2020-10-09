import '@testing-library/jest-dom';
import { mount } from 'enzyme';
import React from 'react'
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk';
import { CalendarModal } from '../../../components/calendar/CalendarModal';

const middlewares = [thunk]
const mockStore = configureStore(middlewares)

const initState = {
  ui: {
    modalOpen: false
  }, 
  calendar: {
    activeEvent: {
      title:"Prueba de evento",
      notes:"Una nota del evento",
      start:"2020-10-09T05:00:00.000Z",
      end:"2020-10-09T06:00:00.000Z",
      id:"5f7f93f93fa7870588f89610",
      user: {
        _id:"5f7be3a8014f613100b4bd71",
        name:"David"
      }
    }
  }
}
const store = mockStore(initState)
store.dispatch = jest.fn()

const wrapper = mount(
  <Provider store={store}>
    <CalendarModal />
  </Provider>
)

describe('<CalendarModal /> testing', () => {
  test('should render conrrectly', () => {
    expect(wrapper).toMatchSnapshot()
  })
})
