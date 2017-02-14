import React from 'react'

const styles = {
  flex: '1 0 33%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center'
}

export default (props) => (
  <div style={Object.assign(props.style, styles)}>
    {props.children}
  </div>
)
