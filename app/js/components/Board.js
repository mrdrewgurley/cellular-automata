import React from 'react'
import PropTypes from 'prop-types'
import Block from './Block'

/**
 * Board Component
 * @desc Generates the board element in the game
 */

const renderBlock = (flip, y) => (on, x) => (
  <Block
    key={x}
    on={on}
    flip={on => flip({
      coordinates: { y, x },
      current: on
    })}
  />
)

const renderRow = flip => (row, y) => (
  <div className="board-row" key={y}>
    {row.map(renderBlock(flip, y))}
  </div>
)

const Board = ({ data, flip }) => (
  <div className="board">
    {data.map(renderRow(flip))}
  </div>
)

export const BoardShape = PropTypes.arrayOf(
  PropTypes.arrayOf(PropTypes.bool)
)

Board.propTypes = {
  data: BoardShape.isRequired,
  flip: PropTypes.func.isRequired
}

export default Board
