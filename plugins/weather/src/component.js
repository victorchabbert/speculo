import React from 'react'

class WeatherPlugin extends React.Component {

  render() {
    const { data } = this.props
    return <div>
      <img src={data.get('icon')} alt="weather"/>
      <p>{data.get('temp')} {data.get('description')}</p>
    </div>
  }
}

export default WeatherPlugin;
