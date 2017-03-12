import React, { Component } from 'react'
import Tile from '../components/TileContainer'

const AsyncLoad = name => new Promise((resolve, reject) => {
  require.ensure([], () => {
    const plugin = require(`../../plugins/${name}/index.js`)
    if (plugin.component) {
      return resolve({
        component: plugin.component
      })
    }
    return reject(`No component for ${name}`)
  })
})

class PluginLoader extends Component {
  state = {
    component: undefined,
    error: undefined
  }
  componentWillMount() {
    AsyncLoad(this.props.name)
    .then(({ component }) => this.setState({ component }))
    .catch(error => this.setState({ error }))
  }
  render() {
    return <Tile>
      {(!this.state.component && <p>Loading...</p>)}
      {(this.state.error && <p style={{background: 'red', color: 'white'}}>{this.state.error}</p>)}
      {(this.state.component && <this.state.component />)}
    </Tile>
  }
}

export default PluginLoader
