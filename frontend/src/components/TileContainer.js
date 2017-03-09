import React from 'react'
import styled from 'styled-components'

const calculateBasis = count => `flex-basis: ${count > 4 ? '33%' : '50%'};`

const Tile = styled.div`
  flex: 1 0;
  ${ props => calculateBasis(props.count) }
  display: flex;
  overflow: hidden;
  justify-content: center;
  align-items: center;
  max-height: 50vh;
  padding: 20px;
`

export default (props) => (
  <Tile count={props.count}>
    {props.children}
  </Tile>
)
