import React from 'react'
import Tile from './Tile'

const styles = {
  height: '100vh',
  display: 'flex',
  flexFlow: 'row wrap',
  alignItems: 'stretch',
}

export default (props) => (
  <div style={styles}>
    <Tile style={{background: 'red'}}>#1</Tile>
    <Tile style={{background: 'blue'}}>#2</Tile>
    <Tile style={{background: 'orange'}}>#3</Tile>
    <Tile style={{background: 'yellow'}}>#4</Tile>
    <Tile style={{background: 'green'}}>#5</Tile>
    <Tile style={{background: 'purple'}}>#6</Tile>
  </div>
)
