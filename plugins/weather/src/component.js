import React from 'react'

class WeatherPlugin extends React.Component {
  constructor() {
    super()
    this.state = {}
  }


  componentDidMount() {
    //this.autoUpdateTime()
  }

  componentWillUnmount() {
    //clearInterval(this._time)
  }

  render() {
    return React.createElement('h1', {}, "TODO")
  }
}

export default WeatherPlugin;
