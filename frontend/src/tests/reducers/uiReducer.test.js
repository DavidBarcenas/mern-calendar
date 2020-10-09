import { uiReducer }from "../../redux/reducers/uiReducer"
import { uiCloseModal, uiOpenModal }from "../../redux/actions/ui"

const initState = {
  modalOpen: false
}

describe('uiReducer testing', () => {
  test('it should return the default state', () => {
    const state = uiReducer(initState, {})
    expect(state).toEqual(initState)
  })
  
  test('I should open and close the modal', () => {
    const modalOpen = uiOpenModal()
    const state = uiReducer(initState, modalOpen)
    expect(state).toEqual({modalOpen: true})

    const modalClose = uiCloseModal()
    const stateClose = uiReducer(state, modalClose)
    expect(stateClose).toEqual({modalOpen: false})
  })
  
})
