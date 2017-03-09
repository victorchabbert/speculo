import React, { Component } from 'react'

class TimePlugin extends Component {
  state = {
    time: new Date().toLocaleString()
  }

  updateTime = () => {
    this.setState({
      time: new Date().toLocaleString()
    })
  }

  autoUpdateTime() {
    setInterval(this.updateTime, 1000)
  }

  componentDidMount() {
    this.autoUpdateTime()
  }

  render() {
    return <h1>{this.state.time}</h1>
  }
}

export default TimePlugin
