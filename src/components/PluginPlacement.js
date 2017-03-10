import React from 'react'
import TileContainer from '../components/TileContainer'

// TODO: add div with 1:1 aspect ratio
export default (props) => (
  <TileContainer count={props.count}>
    {props.component}
  </TileContainer>
)
