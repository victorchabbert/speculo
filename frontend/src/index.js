import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'

import './global-styles.css'

import configureStore from './store'

const initialState = {}
const store = configureStore(initialState)

import SpeculoContainer from './containers/SpeculoContainer'

ReactDOM.render(
  <Provider store={store}>
    <SpeculoContainer />
  </Provider>,
  document.getElementById('root')
)
