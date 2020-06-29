import { v4 as uuidv4 } from "uuid";
import { SET_ALERT, DELETE_ALERT } from "./types";

export const setAlert = (msg) => dispatch => {
  const id = uuidv4();
  dispatch({
    type: SET_ALERT,
    payload: {msg, id}
  });

  setTimeout(() => {
    dispatch({
      type: DELETE_ALERT,
      payload: id
    })
  }, 3000)
}