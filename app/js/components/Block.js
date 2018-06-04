import React from 'react'
import PropTypes from 'prop-types'

const onMouseEvent = (flip, on) => () => {
  flip(on)
}

const Block = ({ on, flip, color }) => (
  <div
    className="board-block"
    onMouseDown={onMouseEvent(flip, on)}
    style={{ backgroundColor: on ? color : null }}
  />
)

Block.propTypes = {
  on: PropTypes.bool,
  flip: PropTypes.func.isRequired,
  color: PropTypes.string
}

Block.defaultProps = {
  on: false,
  color: '#FFF'
}

export default Block
