const { types } = require("../../redux/types/types")

describe('types testing', () => {
  test('they should match the types', () => {
    expect(types).toEqual({
      uiOpenModal: '[ui] Open modal',
      uiCloseModal: '[ui] Close modal',
      uiShowAlert: '[ui] Show alert',
      uiClearAlert: '[ui] Clear alert',
      eventSetActive: '[event] Set active',
      addNewEvent: '[event] Add event',
      updateEvent: '[event] Update event',
      deleteEvent: '[event] Delete event',
      saveEvent: '[event] Save Event',
      logoutEvent: '[event] Clear events',
      getAllEvents: '[event] Get all',
      authObservable: '[auth] Checking login state',
      authObservableNext: '[auth] Finish checking login state',
      authStartLogin: '[auth] Start login',
      authLogin: '[auth] login',
      authStartRegister: '[auth] Start register',
      authTokenRenew: '[auth] Token renew',
      authLogout: '[auth] Logout',
    })
  })
  
})
