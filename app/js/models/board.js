import { always, curry, range } from 'ramda'

const FALSE = always(false)

/**
 * @desc returns a multidimensional array that respresents the game board
 * @param {function} blockState - function to determine block state
 * @return {array}
 */
export const makeBoard = curry((blockState, size) => {
  const r = range(0, size)
  return r.map(y => r.map(x => blockState(y, x)))
})

export const makeEmptyBoard = makeBoard(FALSE)
