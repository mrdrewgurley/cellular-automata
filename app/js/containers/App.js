import React from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import * as BoardActions from '../actions/BoardActions'
import Board, { BoardShape } from '../components/Board'
import Controls from '../components/Controls'

const App = props => (
  <div>
    <Board
      data={props.board}
      flip={props.actions.flip}
    />
    <Controls
      actions={props.actions}
      controls={props.controls}
    />
  </div>
)

App.propTypes = {
  actions: PropTypes.object.isRequired,
  board: BoardShape.isRequired,
  controls: PropTypes.object.isRequired
}

export default connect(
  state => ({ ...state }),
  dispatch => ({ actions: bindActionCreators(BoardActions, dispatch) })
)(App)
