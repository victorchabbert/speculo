import { call } from 'redux-saga/effects'

import { saga as systemSaga } from './redux/system'
export default function *rootSaga() {
  // connect to ws

  // load plugins here
  yield call(systemSaga)
  yield call(console.log, "plugins loaded")
}
