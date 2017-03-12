import React, { Component } from 'react'

const AsyncLoad = (path) => new Promise(resolve => {
  require.ensure([], () => {
    resolve({
      component: require("../../plugins/time/components/Time.js")
    })
  })
})

class PluginLoader extends Component {
  state = {
    component: null
  }
  componentWillMount() {
    AsyncLoad("../plugins/weather/index.js").then(({ component }) => this.setState({ component }))
  }
  render() {
    return <div>
      {!(this.state.component && <p>Loading...</p>)}
      {(this.state.component && <this.state.component />)}
    </div>
  }
}

export default PluginLoader
