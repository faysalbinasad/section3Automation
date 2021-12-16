import { createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import throttle from 'lodash/throttle'

import { saveState, loadState } from './localStorage'
import rootReducer from './rootReducer'

const composedEnhancer = composeWithDevTools()

const persistedState = loadState();
const store = createStore(rootReducer, persistedState, composedEnhancer)

store.subscribe(throttle(() => {
  saveState({
    currentUser: store.getState().currentUser
  });
}, 1000));

export default store
