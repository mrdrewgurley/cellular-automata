import * as actions from '../app/js/actions/BoardActions'
import * as types from '../app/js/constants/ActionTypes'

describe('Actions', () => {
  it('should create an action to clear the board', () => {
    const expectedAction = {
      type: types.CLEAR
    }
    expect(actions.clear()).toEqual(expectedAction)
  })
  it('should create an action to flip a block', () => {
    const expectedAction = {
      type: types.FLIP
    }
    expect(actions.flip()).toEqual(expectedAction)
  })
  it('should create an action to reset the board', () => {
    const expectedAction = {
      type: types.RESET
    }
    expect(actions.reset()).toEqual(expectedAction)
  })
  it('should create an action to start the game', () => {
    const expectedAction = {
      type: types.START
    }
    expect(actions.start()).toEqual(expectedAction)
  })
  it('should create an action to stop the game', () => {
    const expectedAction = {
      type: types.STOP
    }
    expect(actions.stop()).toEqual(expectedAction)
  })
})
