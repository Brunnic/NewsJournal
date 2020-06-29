import { combineReducers } from "redux";

import posts from "./posts";
import auth from "./auth";
import alerts from "./alerts";

export default combineReducers({
  posts,
  auth,
  alerts
});