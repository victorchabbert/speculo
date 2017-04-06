import React, { Component } from 'react'
import Tile from '../components/TileContainer'
import { plugins } from '../../plugins/pluginsManifest'

class PluginLoader extends Component {
  state = {
    component: undefined,
    error: undefined
  }

  componentWillMount() {
    let frontendPlugin = plugins[this.props.name].frontend

    const { component } = frontendPlugin.default ? frontendPlugin.default : frontendPlugin

    if (component) {
      this.setState({ component })
    } else {
      this.setState({ error: `${this.props.name} Component could not be loaded`})
    }
  }

  render() {
    return <Tile>
      {(!(this.state.component || this.state.error) && <p>Loading...</p>)}
      {(this.state.error && <p style={{background: 'red', color: 'white'}}>{this.state.error}</p>)}
      {(this.state.component && <this.state.component />)}
    </Tile>
  }
}

export default PluginLoader
