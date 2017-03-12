const React = require('react')

class TimePlugin extends React.Component {
  constructor() {
    super()
    this.state = {
      time: new Date().toLocaleString()
    }
    this.updateTime = this.updateTime.bind(this)
    this.autoUpdateTime = this.autoUpdateTime.bind(this)
  }

  updateTime() {
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
    return React.createElement('h1', {}, this.state.time)
  }
}

module.exports = TimePlugin
