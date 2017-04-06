import { combineReducers } from 'redux-immutable'

import systemReducer from './redux/system'

export default function createReducer(asyncReducers) {
  return combineReducers({
    system: systemReducer,
    ...asyncReducers
  })
}
