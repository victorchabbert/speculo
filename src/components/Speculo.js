import React from 'react'
import styled from 'styled-components'
import Tile from './TileContainer'

const Speculo = styled.div`
  height: 100vh;
  max-height: 100vh;
  background: grey;
  display: flex;
  flex-flow: row wrap;
  align-items: center;
`

export default (props) => (
  <Speculo>
    {props.plugins.valueSeq().map((plugin, index) => {
      return <Tile key={index}>{plugin.get('component').toObject()}</Tile>
    })}
  </Speculo>
)
