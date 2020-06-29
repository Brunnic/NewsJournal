import {
  GET_POST,
  GET_POSTS,
  ADD_POST,
  UPDATE_POST,
  DELETE_POST,
  POST_ERROR
} from "../actions/types";

const initialState = {
  posts: [],
  post: null,
  loading: true,
  error: {}
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch(type){
    case GET_POSTS:
      return {
        ...state,
        posts: payload,
        loading: false
      };
    case GET_POST:
    case UPDATE_POST:
    case ADD_POST:
      return {
        ...state,
        post: payload,
        loading: false
      }
    case DELETE_POST:
      return {
        ...state,
        post: null,
        loading: false,
      }
    case POST_ERROR:
      return {
        ...state,
        error: payload.msg,
        loading: false
      }
    default:
      return state;
  }
}

