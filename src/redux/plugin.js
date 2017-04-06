import { types } from './system'
import { eventChannel } from 'redux-saga'
import { select, take, takeEvery, fork, cancel } from 'redux-saga/effects'
import { plugins } from '../../plugins/pluginsManifest'

import { getChannelFromName } from './system'

const getPluginSagas = (name) => {
  let p = plugins[name].frontend

  p = p.default ? p.default : p
  return p.sagas
}

const pluginChannel = (channel, socket) => eventChannel(emit => {
  socket.subscribe(`${channel}`, event => emit(event))
  return () => socket.unsubscribe(channel, event => emit(event))
})

function *runPluginSaga(socket, { name }) {
  const channel = yield select(state => getChannelFromName(name)(state.get('system')))

  const pluginSagas = yield getPluginSagas(name).map(
    saga => fork(saga, pluginChannel, channel, socket)
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
