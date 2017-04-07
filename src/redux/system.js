import { Map, fromJS } from 'immutable'
import { eventChannel } from 'redux-saga'
import { call, put, take } from 'redux-saga/effects'

export const types = {
  LOAD_PLUGINS: 'LOAD_PLUGINS',
  SHOW_PLUGIN: 'SHOW_PLUGIN',
  HIDE_PLUGIN: 'HIDE_PLUGIN',
  REMOVE_PLUGIN: 'REMOVE_PLUGIN',
}

export const actions = {
  loadPlugins: (plugins) => ({type: types.LOAD_PLUGINS, plugins}),
  showPlugin: (name) => ({type: types.SHOW_PLUGIN, name}),
  hidePlugin: (name) => ({type: types.HIDE_PLUGIN, name}),
  removePlugin: (name) => ({type: types.REMOVE_PLUGIN, name}),
}

const initialState = fromJS({
  plugins: {},
  active: [],
})

export default (state = initialState, action) => {
  switch (action.type) {
    case types.LOAD_PLUGINS:
      return state.setIn(['plugins'], state.get('plugins').mergeDeep(action.plugins))
    case types.SHOW_PLUGIN:
      let newState = state.setIn(['active'], state.get('active').unshift(action.name))
      if (newState.get('active').size <= 6) {
        return newState
      }
      return newState.setIn(['active'], newState.get('active').pop())
    case types.HIDE_PLUGIN:
    case types.REMOVE_PLUGIN:
      if (!state.get('active').includes(action.name)) {
        return state
      }
      const index = state.get('active').findIndex(v => v === action.name)

      return (index === -1) ? state : state.setIn(['active'], state.get('active').delete(index))
    default:
      return state
  }
}

// Selectors
export const getID = state => state.get('id', "Not set")
export const getActivePlugins = state => state.get('plugins', Map({})).filter((v, k) => state.get('active').includes(k))
export const getChannelFromName = name => state => state.getIn(['plugins', name, 'channel'])

// Sagas
const normalizePlugins = plugins => plugins.reduce((prev, plugin) => {
  return prev.set(plugin.name, fromJS(plugin))
}, Map({}))

const systemChannel = socket => eventChannel(emit => {
  socket.subscribe('/system', event => emit(event), () => null)
  return () => socket.unsubscribe('/system', event => emit(event), () => null)
})

export function *saga(socket) {
  const socketChannel = systemChannel(socket)
  try {
    while (true) {
      const { type, payload } = yield take(socketChannel)

      switch (type) {
        case 'list':
          const pluginsNormalized = yield call(normalizePlugins, payload)
          yield put(actions.loadPlugins(pluginsNormalized))
          break;
        case 'show':
          yield put(actions.showPlugin(payload.name))
          break;
        case 'hide':
          yield put(actions.hidePlugin(payload.name))
          break;
        case 'remove':
          yield put(actions.removePlugin(payload.name))
          break;
        default:
          yield console.log('Unhandled type', type, payload)
          break;
      }
    }
  } finally {
    console.info('system socket channel closed.')
  }
}
