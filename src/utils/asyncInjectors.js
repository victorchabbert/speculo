import conformsTo from 'lodash/conformsTo'
import isFunction from 'lodash/isFunction'
import isObject from 'lodash/isObject'
import isString from 'lodash/isString'
import isEmpty from 'lodash/isEmpty'
import invariant from 'invariant'
import createReducer from '../reducers'

export function checkStore(store) {
  const shape = {
    dispatch: isFunction,
    subscribe: isFunction,
    getState: isFunction,
    replaceReducer: isFunction,
    runSaga: isFunction,
    asyncReducers: isObject
  }

  invariant(
    conformsTo(store, shape),
    '[src/utils] asyncInjectors: Expected a valid redux store'
  )
}

export function injectAsyncReducer(store, isValid) {
  return function injectReducer(name, asyncReducer) {
    if (!isValid) checkStore(store);

    invariant(
      isString(name) && !isEmpty(name) && isFunction(asyncReducer),
      '[src/utils] injectAsyncReducer: Expected `asyncReducer` to be a reducer function'
    )

    if (Reflect.has(store.asyncReducers, name)) {
      return
    }

    store.asyncReducers[name] = asyncReducer
    store.replaceReducer(createReducer(store.asyncReducers))
  }
}

export function injectAsyncReducers(store, isValid) {
  return function injectReducers(reducersObject) {
    if (!isValid) checkStore(store);

    invariant(
      isObject(reducersObject),
      '[src/utils] injectAsyncReducers: Expected `asyncReducers` to be a reducer object'
    )

    Object.keys(reducersObject).forEach(name => {
      const asyncReducer = reducersObject[name]

      invariant(
        isString(name) && !isEmpty(name) && isFunction(asyncReducer),
        '[src/utils] injectAsyncReducer: Expected `asyncReducer` to be a reducer function'
      )

      if (Reflect.has(store.asyncReducers, name)) {
        return
      }

      store.asyncReducers[name] = asyncReducer
    })

    store.replaceReducer(createReducer(store.asyncReducers))
  }
}

export function injectAsyncSagas(store, isValid) {
  return function injectSagas(sagas) {
    if (!isValid) checkStore(store)

    invariant(
      Array.isArray(sagas),
      '[src/utils] injectAsyncSagas: Expected `sagas to be an array of generator functions`'
    )

    sagas.map(store.runSaga)
  }
}

export function getAsyncInjectors(store) {
  checkStore(store)

  return {
    injectReducer: injectAsyncReducer(store, true),
    injectSagas: injectAsyncSagas(store, true)
  }
}
