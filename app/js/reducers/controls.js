import { handleActions } from 'redux-actions'
import * as types from '../constants/ActionTypes'

const DEFAULT = {
  label: 'START',
  clear: false
}

const actionHandlers = {
  [types.CLEAR]: state => ({
    ...state,
    label: 'START',
    clear: true
  }),
  [types.RESET]: state => ({
    ...state,
    label: 'START',
    clear: false
  }),
  [types.START]: state => ({
    ...state,
    label: 'STOP',
    clear: false
  }),
  [types.STOP]: state => ({
    ...state,
    label: 'START',
    clear: false
  })
}

export default handleActions(actionHandlers, DEFAULT)
