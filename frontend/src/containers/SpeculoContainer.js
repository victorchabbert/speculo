import React, { Component } from 'react'

import loadPlugins from '../utils/pluginLoader'

import Speculo from '../components/Speculo'
import Plugin from '../components/PluginPlacement'


export default class SpeculoContainer extends Component {
    render() {
      const pluginNames = Array(2).fill("weather")
      const pluginCount = pluginNames.length
      const plugins = loadPlugins(pluginNames).map((p, i) => <Plugin key={i} count={pluginCount} component={p.component} />)

      return <Speculo plugins={plugins} />
    }
}
