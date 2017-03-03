import React from 'react'

const styles = {
  flex: '1 0 33%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center'
}

export default ({style = {}, ...props}) => (
  <div style={Object.assign(style, styles)}>
    {props.children}
  </div>
)
