import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import MainChat from './components/MainChat'
import ConfigureStore from './store/ConfigureStore'

const store = ConfigureStore();

render(
  <Provider store={store}>
      <MainChat />
  </Provider>,
document.getElementById('mainChatContainer')
)