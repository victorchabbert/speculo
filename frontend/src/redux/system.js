import { Map } from 'immutable'

export const types = {
  SET_ID: 'SET_ID'
}

export const actions = {
  setID: (id) => ({type: types.SET_ID, id})
}

const initialState = Map({
  id: null
})

export default (state = initialState, action) => {
  switch (action.type) {
    case types.SET_ID:
      return state.set('id', action.id)
    default:
      return state
  }
}

export const getID = state => state.get('id', "Not set")
