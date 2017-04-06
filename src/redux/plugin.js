import { types } from './system'
import { select, take, takeEvery, fork, cancel } from 'redux-saga/effects'
import { plugins } from '../../plugins/pluginsManifest'

import { getChannelFromName } from './system'

const getPluginSagas = (name) => {
  let p = plugins[name].frontend

  p = p.default ? p.default : p
  return p.sagas
}

function *runPluginSaga(socket, { name }) {
  const channel = yield select(getChannelFromName(name))
  const pluginSubscribe = cb => socket.subscribe(channel, cb)
  const pluginUnSubscribe = cb => socket.unsubscribe(channel, cb)

  const pluginSagas = yield getPluginSagas(name).map(
    saga => fork(saga, {
      subscribe: pluginSubscribe,
      unsubscribe: pluginUnSubscribe
    })
  )

  let pluginName = ''
  do {
    const action = yield take(types.REMOVE_PLUGIN)
    pluginName = action.name
  } while (pluginName !== name)

  yield pluginSagas.map(s => cancel(s))
}

export function *saga(socket) {
  yield takeEvery(types.SHOW_PLUGIN, runPluginSaga, socket)
}
