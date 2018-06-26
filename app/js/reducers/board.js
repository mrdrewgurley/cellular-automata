import { handleActions } from 'redux-actions'
import * as types from '../constants/ActionTypes'
import { flip, nextState } from '../libs/engine'
import { makeBoard, makeEmptyBoard } from '../libs/board'
import { randomizer } from '../libs/helpers'

/**
 * Board Reducer
 * @desc Reducer for the game board
 * @param {object} actionHandlers - reducerMap for the game board
 * @param {object} DEFAULT - default state
 */
const BOARD_SIZE = 30
const DEFAULT = makeBoard(randomizer, BOARD_SIZE)
const actionHandlers = {
  [ types.CLEAR ]: () => makeEmptyBoard(BOARD_SIZE, BOARD_SIZE),
  [ types.FLIP ]: (state, { payload }) =>
    flip(payload.coordinates, payload.current, state),
  [ types.RESET ]: () => makeBoard(randomizer, BOARD_SIZE),
  [ types.START ]: nextState
}

export default handleActions(actionHandlers, DEFAULT)
