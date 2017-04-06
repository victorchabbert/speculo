import { cancelled, take } from 'redux-saga/effects'

export default (state = {}, action) => {

  return state
}


export function *saga(channel) {

  try {
    while(true) {
      const weather = yield take(channel)
      yield console.log(weather)
    }
  } finally {
    if (yield cancelled()) {
      channel.close()
    }
  }
}
