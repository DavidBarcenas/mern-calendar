import { types } from "../types/types";

const initialState = {
  // see if it is authenticated
  observable: true,
}

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.authLogin:
      return {
        ...state,
        observable: false,
        user: action.payload
      }
    default:
      return state;
  }
}