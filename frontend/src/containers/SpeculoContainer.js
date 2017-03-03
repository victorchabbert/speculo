import React, { Component } from 'react'

import loadPlugin from '../utils/pluginLoader'

import Speculo from '../components/Speculo'
import Plugin from '../components/PluginPlacement'


export default class SpeculoContainer extends Component {
    render() {
      const pluginNames = ["weather", "weather", "weather", "weather", "weather"]
      const plugins = pluginNames.map(loadPlugin).map((p, i) => <Plugin key={i} component={p.component} />)

      return <Speculo>{plugins}</Speculo>
    }
}
