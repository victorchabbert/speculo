import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'

import './global-styles.css'

import configureStore from './store'

const initialState = {}
const store = configureStore(initialState)

import Speculo from './components/Speculo'

ReactDOM.render(
  <Provider store={store}>
    <Speculo />
  </Provider>,
  document.getElementById('root')
)
