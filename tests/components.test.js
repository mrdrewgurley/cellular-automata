import React from 'react'
import renderer from 'react-test-renderer'

import Block from '../app/js/components/Block'
import Board from '../app/js/components/Board'
import Controls from '../app/js/components/Controls'
import * as actions from '../app/js/actions/BoardActions'

describe("Block Component", () => {
  it("renders with proper defaults", () => {
    const BlockComponent = renderer
      .create(<Block flip={on => flip({
        coordinates: { y, x },
        current: on
      })} />)
      .toJSON()

    expect(BlockComponent).toMatchSnapshot()
  })
})

describe("Board Component", () => {
  it("renders with proper defaults", () => {
    const BoardComponent = renderer
      .create(<Board
          data={[[true,false]]}
          flip={on => flip({
            coordinates: { y, x },
            current: on
          })} />)
      .toJSON()

    expect(BoardComponent).toMatchSnapshot()
  })
})

describe("Controls Component", () => {
  it("renders with proper defaults", () => {
    const ControlsComponent = renderer
      .create(<Controls
        actions={actions}
        controls={{label: "START", clear: false}} />)
      .toJSON()

    expect(ControlsComponent).toMatchSnapshot()
  })
})
