import React, { Component } from 'react'
import Tile from '../components/TileContainer'
import plugins from '../../plugins/pluginsConfig'

class PluginLoader extends Component {
  state = {
    component: undefined,
    error: undefined
  }
  componentWillMount() {
    const { component } = plugins[this.props.name]

    if (component) {
      this.setState({ component })
    } else {
      this.setState({ error: `${this.props.name} Component not found`})
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
