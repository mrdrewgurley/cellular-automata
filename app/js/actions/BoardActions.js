import { createAction } from 'redux-actions'
import * as types from '../constants/ActionTypes'

/**
 * Board Actions
 * @desc Binding of actions to respective ActionTypes
 */
export const clear = createAction(types.CLEAR)
export const flip = createAction(types.FLIP)
export const reset = createAction(types.RESET)
export const start = createAction(types.START)
export const stop = createAction(types.STOP)
