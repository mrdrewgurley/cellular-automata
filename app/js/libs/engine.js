import * as helpers from './helpers'

/**
 * @desc gets the current count of neighbors for a designated block
 * @param {array} board - dataset representing the game board
 * @param {object} coordinates - coordinate pair to define block
 * @param {int} coordinates.y - y coordinate
 * @param {int} coordinates.x - x coordinate
 * @return {int}
 */
export const getNeighbors = (board, coordinates) =>
  helpers.getPlots(coordinates)
    .map(helpers.getBlockState(board))
    .reduce((a, b) => a + b)

/**
 * @desc determines block state based on its neighbors
 * @param {bool} on - designated state of block
 * @param {int} neighbors - number of neighbors
 * @return {bool}
 */
export const process = (on, neighbors) =>
  on
   ? neighbors >= 2 && neighbors <= 3
   : neighbors === 3

/**
 * @desc switches a blocks current state
 * @param {object} coordinates - coordinate pair to define block
 * @param {int} coordinates.y - y coordinate
 * @param {int} coordinates.x - x coordinate
 * @param {bool} current - designated state of block
 * @param {array} board - dataset representing the game board
 * @return {array}
 */
export const flip = ({ y, x }, current, board) =>
  helpers.set(y, helpers.set(x, !current, board[y]), board)

/**
 * @desc performs process methods on each block and returns a new board state
 * @param {array} board - dataset representing the game board
 * @return {array}
 */
export const nextState = board =>
  board.map((row, y) =>
    row.map((column, x) =>
      process(column, getNeighbors(board, { y, x }))
    )
  )
