import { createAction } from 'redux-actions'
import * as types from '../constants/ActionTypes'

export const clear = createAction(types.CLEAR)
export const flip = createAction(types.FLIP)
export const reset = createAction(types.RESET)
export const start = createAction(types.START)
export const stop = createAction(types.STOP)
