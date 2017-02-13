import { combineReducers } from 'redux-immutable'

import systemReducer from './redux/system'

export default function createReducer() {
  return combineReducers({
    system: systemReducer
  })
}
