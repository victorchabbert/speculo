import React from 'react'
import TileContainer from './TileContainer'

const styles = {
  height: '100vh',
  display: 'flex',
  flexFlow: 'row wrap',
  alignItems: 'stretch',
}

export default (props) => (
  <div style={styles}>
    <TileContainer style={{background: 'red'}}>#1</TileContainer>
    <TileContainer style={{background: 'blue'}}>#2</TileContainer>
    <TileContainer style={{background: 'orange'}}>#3</TileContainer>
    <TileContainer style={{background: 'yellow'}}>#4</TileContainer>
    <TileContainer style={{background: 'green'}}>#5</TileContainer>
    <TileContainer style={{background: 'purple'}}>#6</TileContainer>
  </div>
)
