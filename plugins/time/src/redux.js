import { cancelled, take } from 'redux-saga/effects'

export default (state = {}, action) => {
  console.log('time reducer', action)
  return state
}

export function *saga({ subscribe }) {
  try {
    yield console.log('Hello from time')
    while (true) {
      yield take('test')
    }
  } finally {
    if (yield cancelled) {
      yield console.info('time saga cancelled')
    }
  }
}
