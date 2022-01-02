import { combineReducers } from 'redux';

import currentUserReducer from '../slices/currentUser';
import userProductsReducer from '../slices/userProducts';

const rootReducer = combineReducers({
  currentUser: currentUserReducer,
  userProducts: userProductsReducer,
});

export default rootReducer
