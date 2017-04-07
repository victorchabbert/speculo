import React, { Component } from 'react'
import { connect } from 'react-redux'
import Tile from '../components/TileContainer'
import { plugins } from '../../plugins/pluginsManifest'

class PluginLoader extends Component {
  state = {
    component: undefined,
    error: undefined
  }

  setComponent = name => {
    let frontendPlugin = plugins[name].frontend
    const { component } = frontendPlugin.default ? frontendPlugin.default : frontendPlugin
    if (component) {
      this.setState({ component })
    } else {
      this.setState({ error: `${name} Component could not be loaded`})
    }
  }

  componentWillMount() {
    this.setComponent(this.props.name)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.name === this.props.name) {
      return
    }
    this.setComponent(nextProps.name)
  }

  render() {
    return <Tile>
      {(!(this.state.component || this.state.error) && <p>Loading...</p>)}
      {(this.state.error && <p style={{background: 'red', color: 'white'}}>{this.state.error}</p>)}
      {(this.state.component && <this.state.component data={this.props.data} />)}
    </Tile>
  }
}

const mapStateToProps = (state, props) => ({
  data: state.get(props.name)
})

export default connect(mapStateToProps, {})(PluginLoader)
