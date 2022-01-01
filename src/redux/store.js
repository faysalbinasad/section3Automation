import { createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import throttle from 'lodash/throttle'

import rootReducer from './rootReducer'

const composedEnhancer = composeWithDevTools()

const persistedState = loadState();
const store = createStore(rootReducer, persistedState, composedEnhancer)

export default store
