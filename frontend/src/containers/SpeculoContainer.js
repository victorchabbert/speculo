import { connect } from 'react-redux'
import Speculo from '../components/Speculo'

const mapStateToProps = (state) => ({
  plugins: state.getIn(['system', 'plugins'])
})

const mapDispatchToProps = {
}

export default connect(mapStateToProps, mapDispatchToProps)(Speculo)
