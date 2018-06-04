import { combineReducers } from 'redux'
import board from './board'
import controls from './controls'

const reducer = combineReducers({
  board,
  controls
})

export default reducer
