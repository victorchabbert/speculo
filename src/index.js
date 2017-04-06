import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'

import './global-styles.css'

import configureStore from './store'
import { injectAsyncReducers } from './utils/asyncInjectors'

const initialState = {}
const store = configureStore(initialState)

const injectReducers = injectAsyncReducers(store, false)
import { plugins, pluginList } from '../plugins/pluginsManifest'
const p = {}
pluginList.map(name => {
  Object.assign(p, {
    [name]: plugins[name].frontend.default.reducer
  })
  return name
})

injectReducers(p)

import SpeculoContainer from './containers/SpeculoContainer'

ReactDOM.render(
  <Provider store={store}>
    <SpeculoContainer />
  </Provider>,
  document.getElementById('root')
)
