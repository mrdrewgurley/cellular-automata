import Store from '../app/js/store/Store'
const state = Store().getState()

describe('Store.state', () => {
  it('.board should exist', () => {
    expect(state.board).toBeDefined()
  })

  it('.controls.clear should be false', () => {
    expect(state.controls.clear).toBeFalsy()
  })

  it('.controls.label should equal "START"', () => {
    expect(state.controls.label).toEqual('START')
  })
})
