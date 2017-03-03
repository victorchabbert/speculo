import React, { Component } from 'react'

import loadPlugins from '../utils/pluginLoader'

import Speculo from '../components/Speculo'
import Plugin from '../components/PluginPlacement'


export default class SpeculoContainer extends Component {
    render() {
      const pluginNames = ["weather", "nothing"]
      const plugins = loadPlugins(pluginNames).map((p, i) => <Plugin key={i} component={p.component} />)

      return <Speculo>{plugins}</Speculo>
    }
}
