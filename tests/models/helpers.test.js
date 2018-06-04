import * as helpers from '../../app/js/models/helpers'

describe('helpers.getPlots', () => {
  let expected = [[5, 5], [5, 6], [5, 7], [6, 5], [6, 7], [7, 5], [7, 6], [7, 7]]
  it('should return a list of neigboring plots', () => {
    expect(helpers.getPlots({x:6,y:6})).toEqual(expected)
  })
})

describe('helpers.getFixedKey', () => {
  it('should change key to upperbound', () => {
    expect([-1].map(helpers.getFixedKey(3))).toEqual([2])
  })

  it('should change key to lowerbound', () => {
    expect([3].map(helpers.getFixedKey(3))).toEqual([0])
  })
})

describe('helpers.getKeys', () => {
  it('should return fixed keys', () => {
    expect(helpers.getKeys(3,[3,-1])).toEqual([0, 2])
  })
})

describe('helpers.getBlockState', () => {
  it('should get the desired state from the board', () => {
    let board = [[true,false],[false,true],[true,true]]
    expect([[1,1]].map(helpers.getBlockState(board))).toBeTruthy()
  })
})

describe('helpers.set', () => {
  let original = [[true,false],[false,false],[false,true]]

  it('should return new immutable array', () => {
    expect(helpers.set(1,[false,false],original)).toEqual(original)
  })

  it('should return new immutable array with new row', () => {
    let expected = [[true,false],[true,true],[false,true]]
    expect(helpers.set(1,[true,true],original)).toEqual(expected)
  })
})
