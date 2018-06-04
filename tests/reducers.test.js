import board from '../app/js/reducers/board'
import controls from '../app/js/reducers/controls'
import * as types from '../app/js/constants/ActionTypes'

jest.mock("../app/js/models/board", function() {
 return {
   makeBoard: jest.fn((blockState, size) => {
     return [[false, true], [true, false]]
   }),
   makeEmptyBoard: jest.fn((blockState) => {
     return [[false, false], [false, false]]
   })
 }
})

describe('Board Reducer', () => {
  it('should return the initial state', () => {
    expect(board(undefined, {})).toEqual([
      [false,true],
      [true,false]
    ])
  })

  it('should handle clear action', () => {
    expect(
      board([[false, true], [true, false]], {
        type: types.CLEAR
      })
    ).toEqual([
      [false,false],
      [false,false]
    ])
  })

  it('should handle flip action', () => {
    expect(
      board([[false, true], [true, false]], {
        type: types.FLIP,
        payload: {
          coordinates: {
            x: 1,
            y: 1
          },
          current: false
        }
      })
    ).toEqual([
      [false,true],
      [true,true]
    ])
  })

  it('should handle reset action', () => {
    expect(
      board([[false, true], [true, false]], {
        type: types.RESET
      })
    ).toEqual([
      [false,true],
      [true,false]
    ])
  })

  it('should handle start action', () => {
    expect(
      board([[false, true], [true, false]], {
        type: types.START
      })
    ).toEqual([
      [false,false],
      [false,false]
    ])
  })
})

describe('Controls Reducer', () => {
  it('should return the initial state', () => {
    expect(controls(undefined, {})).toEqual({
      label: 'START',
      clear: false
    })
  })

  it('should handle clear action', () => {
    expect(
      controls({}, {
        type: types.CLEAR
      })
    ).toEqual({
      label: 'START',
      clear: true
    })
  })

  it('should handle reset action', () => {
    expect(
      controls({}, {
        type: types.RESET
      })
    ).toEqual({
      label: 'START',
      clear: false
    })
  })

  it('should handle start action', () => {
    expect(
      controls({}, {
        type: types.START
      })
    ).toEqual({
      label: 'STOP',
      clear: false
    })
  })

  it('should handle stop action', () => {
    expect(
      controls({}, {
        type: types.STOP
      })
    ).toEqual({
      label: 'START',
      clear: false
    })
  })
})
