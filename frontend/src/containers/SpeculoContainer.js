import React, { Component } from 'react'
import { connect } from 'react-redux'

import loadPlugins from '../utils/pluginLoader'

import Speculo from '../components/Speculo'


class SpeculoContainer extends Component {

  render() {
    // const pluginNames = Array(2).fill("weather")
    // const pluginCount = pluginNames.length
    // const plugins = loadPlugins(pluginNames)
    // const pluginDisplay = plugins.map((p, i) => <Plugin key={i} count={pluginCount} component={p.component} />)
    return <Speculo />
  }
}

const mapStateToProps = (state) => ({
  plugins: []
})

import { actions as systemActions } from '../redux/system'

const mapDispatchToProps = {
  loadPlugins: systemActions.loadPlugins
}

export default connect(mapStateToProps, mapDispatchToProps)(SpeculoContainer)
