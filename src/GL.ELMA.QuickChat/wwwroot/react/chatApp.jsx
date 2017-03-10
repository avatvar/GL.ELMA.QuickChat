import { render } from 'react-dom'
import { Provider } from 'react-redux'
import MainChat from './components/MainChat'
import initChatStore from './store/chatStore'

const store = initChatStore();

render(
  <Provider store={store}>
      <MainChat />
  </Provider>, 
document.getElementById('mainChatContainer'))