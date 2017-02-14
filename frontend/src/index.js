import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'

import './global-styles.css'

import configureStore from './store'

const initialState = {}
const store = configureStore(initialState)

import TileContainer from './components/TileContainer'

ReactDOM.render(
  <Provider store={store}>
    <TileContainer />
  </Provider>,
  document.getElementById('root')
)
