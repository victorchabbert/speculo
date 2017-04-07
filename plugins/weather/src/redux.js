import { fromJS } from 'immutable'
import { cancelled, take, put } from 'redux-saga/effects'

const types = {
  SET_DATA: 'weather/SET_DATA'
}

export const actions = {
  setData: (data) => ({type: types.SET_DATA, data})
}

const initialState = fromJS({
  description: '',
  icon: '',
  temp: 0,
  city: ''
})

export default (state = initialState, action) => {
  if (action.type === types.SET_DATA) {
    return state.merge(action.data)
  }
  return state
}

const getCelsius = kelvins => (kelvins - 273.15).toFixed(1)
const getFahrenheit = kelvins => (kelvins * (9/5) - 459.67).toFixed(1)

export function *saga(channel) {

  try {
    while(true) {
      const { main, weather, address } = yield take(channel)
      const { icon, description } = weather[0];

      const data = {
        temp: getCelsius(main.temp),
        icon: `http://openweathermap.org/img/w/${icon}.png`,
        description,
        city: address
      }

      yield put(actions.setData(data))
    }
  } finally {
    if (yield cancelled()) {
      yield console.log('weather channel closed')
    }
  }
}
