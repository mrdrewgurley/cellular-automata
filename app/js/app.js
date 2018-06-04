import Icons from 'uikit/dist/js/uikit-icons';
import UIkit from 'uikit/dist/js/uikit'

import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import App from './containers/App'
import Store from './store/Store'

const store = Store()
UIkit.use(Icons);

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('gameboard')
)
