import '@testing-library/jest-dom';
import React from 'react'
import { Provider } from 'react-redux';
import { mount } from 'enzyme';
import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk';
import { CalendarScreen } from '../../../components/calendar/CalendarScreen';
import { messages_es } from '../../../utils/messages-es';
import { types } from '../../../redux/types/types';
import { eventSetActive } from '../../../redux/actions/events'
import { act } from '@testing-library/react';


jest.mock('../../../redux/actions/events', () => ({
  eventSetActive: jest.fn(),
  getStartEvent: jest.fn(),
}))

Storage.prototype.setItem = jest.fn()

const middlewares = [thunk]
const mockStore = configureStore(middlewares)

const initState = {
  ui: {
    modalOpen: false
  },
  calendar: {
    events: [],
    activeEvent:{}
  },
  auth: {
    observable: false,
    user: {
      uid: '123asd1asd',
      name: 'Marco'
    }
  }
}

const store = mockStore(initState)
store.dispatch = jest.fn()

const wrapper = mount(
  <Provider store={store}>
    <CalendarScreen />
  </Provider>
)

describe('<CalendarScreen /> testing', () => {
  test('should render correctly', () => {
    expect(wrapper).toMatchSnapshot()
  })

  test('should fire events', () => {
    const calendar = wrapper.find('Calendar')
    const calendarMessages = calendar.prop('messages')
    expect(calendarMessages).toEqual(messages_es)

    calendar.prop('onDoubleClickEvent')()
    expect(store.dispatch).toHaveBeenCalledWith({type: types.uiOpenModal})
    
    calendar.prop('onSelectEvent')({
      title:"Prueba de evento",
      notes:"Una nota del evento",
      start:"2020-10-09T05:00:00.000Z",
      end:"2020-10-09T06:00:00.000Z",
      id:"5f7f93f93fa7870588f89610",
      user: {
        _id:"5f7be3a8014f613100b4bd71",
        name:"David"
      }
    })
    expect(eventSetActive).toHaveBeenCalledWith({
      title:"Prueba de evento",
      notes:"Una nota del evento",
      start:"2020-10-09T05:00:00.000Z",
      end:"2020-10-09T06:00:00.000Z",
      id:"5f7f93f93fa7870588f89610",
      user: {
        _id:"5f7be3a8014f613100b4bd71",
        name:"David"
      }
    })

    act(() => {
      calendar.prop('onView')('week')
    })
  })
  
})
