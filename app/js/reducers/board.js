import { handleActions } from 'redux-actions'
import * as types from '../constants/ActionTypes'
import { flip, nextState } from '../models/engine'
import { makeBoard, makeEmptyBoard } from '../models/board'
import { randomizer } from '../models/helpers'

const BOARD_SIZE = 30
const DEFAULT = makeBoard(randomizer, BOARD_SIZE)
const actionHandlers = {
  [types.CLEAR]: () => makeEmptyBoard(BOARD_SIZE, BOARD_SIZE),
  [types.FLIP]: (state, { payload }) =>
    flip(payload.coordinates, payload.current, state),
  [types.RESET]: () => makeBoard(randomizer, BOARD_SIZE),
  [types.START]: nextState
}

export default handleActions(actionHandlers, DEFAULT)
