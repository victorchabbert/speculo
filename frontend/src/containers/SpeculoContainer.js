import React, { Component } from 'react'
import { connect } from 'react-redux'


import Speculo from '../components/Speculo'


class SpeculoContainer extends Component {

  render() {
    return <Speculo />
  }
}

const mapStateToProps = (state) => ({
  plugins: []
})

import { actions as systemActions } from '../redux/system'

const mapDispatchToProps = {
  loadPlugins: systemActions.loadPlugins
}

export default connect(mapStateToProps, mapDispatchToProps)(SpeculoContainer)
