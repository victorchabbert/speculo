import { Map, fromJS } from 'immutable'
import { eventChannel } from 'redux-saga'
import { call, put, take } from 'redux-saga/effects'

export const types = {
  SET_ID: 'SET_ID',
  LOAD_PLUGINS: 'LOAD_PLUGINS',
  DISPLAY_PLUGIN: 'DISPLAY_PLUGIN',
  HIDE_PLUGIN: 'HIDE_PLUGIN',
}

export const actions = {
  setID: (id) => ({type: types.SET_ID, id}),
  loadPlugins: (plugins) => ({type: types.LOAD_PLUGINS, plugins}),
  displayPlugin: (name) => ({type: types.DISPLAY_PLUGIN, name}),
  hidePlugin: (name) => ({type: types.DISPLAY_PLUGIN, name}),
}

const initialState = fromJS({
  id: null,
  plugins: {},
  active: [],
})

export default (state = initialState, action) => {
  switch (action.type) {
    case types.SET_ID:
      return state.set('id', action.id)
    case types.LOAD_PLUGINS:
      return state.setIn(['plugins'], state.get('plugins').mergeDeep(action.plugins))
    case types.DISPLAY_PLUGIN:
      let newState = state.setIn(['active'], state.get('active').unshift(action.name))
      if (newState.get('active').size <= 6) {
        return newState
      }
      return newState.setIn(['active'], newState.get('active').pop())
    case types.HIDE_PLUGIN:
      if (!state.get('active').has(action.name)) {
        return state
      }
      const index = state.get('active').findIndex(v => v === action.name)
      if (index === -1) {
        return state
      }
      return state.setIn(['active'], state.get('active').delete(index))
    default:
      return state
  }
}

// Selectors
export const getID = state => state.get('id', "Not set")
export const getActivePlugins = state => state.get('plugins', Map({})).filter((v, k) => state.get('active').has(k))

// Sagas
const normalizePlugins = plugins => plugins.reduce((prev, plugin) => {
  return prev.set(plugin.name, fromJS(plugin))
}, Map({}))

const systemChannel = socket => eventChannel(emit => {
  socket.subscribe('/system', event => emit(event))
  return () => socket.unsubscribe('/system', event => emit(event))
})

export function *saga(socket) {
  const socketChannel = systemChannel(socket)
  try {
    while (true) {
      const plugins = yield take(socketChannel)
      const pluginsNormalized = yield call(normalizePlugins, plugins)
      yield put(actions.loadPlugins(pluginsNormalized))
    }
  } finally {
    console.info('system socket channel closed.')
  }
}
