import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

/**
 * Controls Component
 * @desc Generates the controls of the game
 */

export default class Controls extends PureComponent {
  handleClickReset = () => {
    this.stop()
    this.props.actions.reset()
  }

  handleClickToggle = () => {
    if (this.props.controls.label === 'STOP') {
      this.stop()
    } else {
      if (this.props.controls.clear) {
        this.props.actions.reset()
      }
      window.interval = window.setInterval(this.props.actions.start, 100)
    }
  }

  handleClickClear = () => {
    this.stop()
    this.props.actions.clear()
  }

  stop = () => {
    this.props.actions.stop()
    clearInterval(window.interval)
  }

  render () {
    return (
      <div className="controls uk-button-group">
        <button
          className="uk-button uk-button-default uk-margin-right"
          onClick={this.handleClickToggle}
        >
          {this.props.controls.label}
        </button>
        <button
          className="uk-button uk-button-default uk-margin-right"
          onClick={this.handleClickReset}
        >
          RESET
        </button>
        <button
          className="uk-button uk-button-default"
          onClick={this.handleClickClear}
        >
          CLEAR
        </button>
      </div>
    )
  }
}

Controls.propTypes = {
  actions: PropTypes.object.isRequired,
  controls: PropTypes.object.isRequired
}
