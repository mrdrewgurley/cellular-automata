/**
 * @desc returns an array arrays of neighboring plots from provided coordinates
 * @param {object} coordinates - coordinate pair to define block
 * @param {int} coordinates.y - y coordinate
 * @param {int} coordinates.x - x coordinate
 * @return {array}
 */
export const getPlots = ({ y, x }) =>
    [-1, 0, 1].reduce((a, $y, i, offset) =>
      offset.reduce((b, $x) =>
        ($x || $y) ? [...b, [y + $y, x + $x]] : b,
        a
      ),
      []
    )

/**
 * @desc returns appropriate index keys
 * @param {int} size - length of board array
 * @param {int} key - index value of board array
 * @return {array}
 */
export const getFixedKey = size => (key) => {
  if (key === -1) { return size - 1 }
  if (key === size) { return 0 }
  return key
}

/**
 * @desc returns array of corrected keys
 * @param {int} size - length of board array
 * @param {array} keys - coordinate pair to define block
 * @return {array}
 */
export const getKeys = (size, keys) =>
  keys.map(getFixedKey(size))

/**
 * @desc returns value from index position
 * @param {array} board - dataset representing the game board
 * @param {array} coordinates - coordinate pair to define block
 * @return {bool}
 */
export const getBlockState = board => coordinates =>
  (([y, x]) => board[y][x])(getKeys(board.length, coordinates)) || false

/**
 * @desc returns a randomized boolean value
 * @param {int} y - coordinate from multidimensional array
 * @param {int} x - coordinate from multidimensional array
 * @return {bool}
 */
export const randomizer = (y, x) => Math.random(x + y) < 0.33

/**
 * @desc creates an immutable array of arrays with new row replacement
 * @param {int} i - index of value
 * @param {array} value - value to set
 * @param {array} array - intial array of arrays
 * @return {array}
 */
export const set = (i, value, array) => [
  ...array.slice(0, i),
  value,
  ...array.slice(i + 1)
]
