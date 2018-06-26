import { combineReducers } from 'redux'
import board from './board'
import controls from './controls'

/**
 * Root Reducer
 * @desc Reducer that combines the other application reducers
 * @param {object} reducers - the reducers to combine
 */
const reducer = combineReducers({
  board,
  controls
})

export default reducer
