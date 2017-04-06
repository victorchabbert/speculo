import React from 'react'

class TimePlugin extends React.Component {
  constructor() {
    super()
    this.state = {
      time: new Date().toLocaleString()
    }
    // this.updateTime = this.updateTime.bind(this)
    // this.autoUpdateTime = this.autoUpdateTime.bind(this)
  }

  updateTime = () => {
    this.setState({
      time: new Date().toLocaleString()
    })
  }

  autoUpdateTime = () => {
    this._time = setInterval(this.updateTime, 1000)
  }

  componentDidMount() {
    this.autoUpdateTime()
  }

  componentWillUnmount() {
    clearInterval(this._time)
  }

  render() {
    return React.createElement('h1', {}, this.state.time)
  }
}

export default TimePlugin;
