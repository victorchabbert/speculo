import React from 'react'


const styles = {
  height: '100vh',
  display: 'flex',
  flexFlow: 'row wrap',
  alignItems: 'stretch',
}

export default (props) => (
  <div style={styles}>
    {props.children}
  </div>
)
