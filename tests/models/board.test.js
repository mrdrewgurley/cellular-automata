import { always } from 'ramda'
import * as board from '../../app/js/models/board'

describe('board.makeBoard', () => {
  it('parent array length should match grid size', () => {
    expect(board.makeBoard(always(false), 2).length).toEqual(2)
  })

  it.each([board.makeBoard(always(false), 2)])(
    'child array lengths should match grid size',
    (child) => {
      expect(child.length).toEqual(2)
    }
  )
})

describe('board.makeEmptyBoard', () => {
  it.each(board.makeEmptyBoard(2))(
    'test.each: values to be false',
    (boolean) => {
      expect(boolean).toBeFalsy()
    }
  )
})
