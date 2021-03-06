import { connect } from 'react-redux'
import Speculo from '../components/Speculo'

import { getActivePlugins } from '../redux/system'

const mapStateToProps = (state) => ({
  plugins: getActivePlugins(state.get('system'))
})

const mapDispatchToProps = {
}

export default connect(mapStateToProps, mapDispatchToProps)(Speculo)
