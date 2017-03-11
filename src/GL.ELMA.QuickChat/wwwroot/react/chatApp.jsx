import { render } from 'react-dom'
import { Provider } from 'react-redux'
import MainChat from './components/MainChat'
import initMainStore from './store/mainStore'

const store = initMainStore();

render(
  <Provider store={store}>
      <MainChat/>
  </Provider>, 
document.getElementById('mainChatContainer'))