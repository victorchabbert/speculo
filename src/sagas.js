import { call, take } from 'redux-saga/effects'

import { saga as systemSaga } from './redux/system'
import { saga as pluginSaga } from './redux/plugin'

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
  yield [
    call(systemSaga, wsConnection),
    call(pluginSaga, wsConnection),
    call(wsDebug, wsConnection)
  ]
}

function *wsDebug(socket) {
  while (true) {
    yield take('WS_DEBUG')
    yield console.log('subs', socket.subscriptions())
  }
}
