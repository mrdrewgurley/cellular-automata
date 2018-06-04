import React from 'react'
import renderer from 'react-test-renderer'
import { Provider } from 'react-redux'

import App from '../app/js/containers/App'
import Store from '../app/js/store/Store'

const store = Store()
store.getState().board = [[false,true],[true,false]]

describe("App Container", () => {
  it("renders with proper defaults", () => {
    const AppContainer = renderer
      .create(<Provider store={store}>
        <App />
      </Provider>)
      .toJSON()

    expect(AppContainer).toMatchSnapshot()
  })
})
