import {
  GET_USER,
  USER_LOGIN,
  USER_LOGOUT,
  USER_ERROR,
  USER_REGISTER
} from "../actions/types";

const initialState = {
  isAuthenticated: false,
  user: null,
  loading: true,
  error: [],
};


export default function(state = initialState, action) {
  const { type, payload } = action;

  switch(type) {
    case USER_LOGIN:
      return {
        ...state,
        ...payload,
        loading: false
      }
    case USER_REGISTER:
      return {
        ...state,
        loading: false
      }
    case USER_LOGOUT:
      return {
        ...state,
        isAuthenticated: false,
        user: payload.user,
        loading: false
      }
    case GET_USER:
      return {
        ...state,
        ...payload,
        loading: false
      }
    case USER_ERROR:
      return {
        ...state,
        loading: false
      }
    default:
      return state;
  }
}

