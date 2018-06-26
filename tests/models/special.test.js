import { randomizer } from '../../app/js/libs/helpers'

const mockMath = Object.create(global.Math)
mockMath.random = (value) => value
global.Math = mockMath;

describe('helpers.randomizer', () => {
  it('should return true', () => {
    expect(randomizer(0, 0)).toBeTruthy()
  })

  it('should return false', () => {
    expect(randomizer(0, 1)).toBeFalsy()
  })
})
