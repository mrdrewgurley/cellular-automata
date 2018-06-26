import { createStore } from 'redux'
import reducers from '../reducers'

/**
 * Application Store
 * @desc returns the applications store
 * @param {object} intialState - default dataset for the application store
 */
export default initialState =>
  createStore(reducers, initialState)
