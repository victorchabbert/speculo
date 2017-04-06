import { call } from 'redux-saga/effects'

import { saga as systemSaga } from './redux/system'
import createWsConnection from './utils/createWsConnection'
export default function *rootSaga() {
  let wsConnection
  try {
    wsConnection = yield call(createWsConnection)
  } catch (error) {
    console.error('Could not connect to socket !')
    return
  }
  // load plugins here
  yield call(systemSaga, wsConnection)
  yield call(console.log, "Plugins loaded")
}
