import { combineReducers } from "redux";

import currentUserReducer from "../slices/currentUser";

const rootReducer = combineReducers({
  currentUser: currentUserReducer,
});

export default rootReducer
