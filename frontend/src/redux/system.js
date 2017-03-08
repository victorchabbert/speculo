import { Map, fromJS } from 'immutable'
import { call, put } from 'redux-saga/effects'
import pluginsLoader from '../utils/pluginLoader'

export const types = {
  SET_ID: 'SET_ID',
  LOAD_PLUGINS: 'LOAD_PLUGINS'
}

export const actions = {
  setID: (id) => ({type: types.SET_ID, id}),
  loadPlugins: (plugins) => ({type: types.LOAD_PLUGINS, plugins})
}

const initialState = Map({
  id: null
})

export default (state = initialState, action) => {
  switch (action.type) {
    case types.SET_ID:
      return state.set('id', action.id)
    default:
      return state
  }
}

// Selectors
export const getID = state => state.get('id', "Not set")

// Sagas
const normalizePlugins = plugins => plugins.reduce((prev, plugin) => {
  return prev.set(plugin.name, fromJS(plugin))
}, Map({}))

export function *saga() {
  // Todo get plugin names from manifest
  const pluginNames = Array(2).fill("weather")
  const plugins = yield call(pluginsLoader, pluginNames)
  const pluginsNormalized = yield call(normalizePlugins, plugins)
  yield put(actions.loadPlugins(pluginsNormalized))
}
