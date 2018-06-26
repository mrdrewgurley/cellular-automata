import * as engine from '../../app/js/libs/engine'

describe('engine.getNeighbors', () => {
  it('should return number of neighbors', () => {
    let board = [ [ true, true ], [ true, true ], [ true, true ] ]
    expect(engine.getNeighbors(board, { x: 1, y: 1 })).toEqual(5)
  })
})

describe('engine.process', () => {
  it('should return false due to overpopulation', () => {
    expect(engine.process(true, 5)).toBeFalsy()
  })

  it('should return false due to underpopulation', () => {
    expect(engine.process(false, 1)).toBeFalsy()
  })

  it('should return true due to population growth', () => {
    expect(engine.process(false, 3)).toBeTruthy()
  })

  it('should return true due to acceptable population', () => {
    expect(engine.process(true, 2)).toBeTruthy()
  })
})

describe('engine.flip', () => {
  it('should return new board with updated state', () => {
    let board = [ [ true, true ], [ true, true ], [ true, true ] ]
    let expected = [ [ true, true ], [ true, false ], [ true, true ] ]
    expect(engine.flip({ x: 1, y: 1 }, true, board)).toEqual(expected)
  })
})

describe('engine.nextState', () => {
  it('should return new board with updated states', () => {
    let board = [ [ true, true ], [ true, true ], [ true, true ] ]
    let expected = [ [ false, false ], [ false, false ], [ false, false ] ]
    expect(engine.nextState(board)).toEqual(expected)
  })
})
