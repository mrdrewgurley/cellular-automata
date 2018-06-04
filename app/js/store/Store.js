import { createStore } from 'redux'
import reducers from '../reducers'

/**
 * @desc returns the applications store
 * @param {object} intialState - default dataset for the application store
 * @return {object}
 */
export default initialState =>
  createStore(reducers, initialState)
