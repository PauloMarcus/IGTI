
import { Provider } from 'react-redux';
import TicTacToe from './views/TicTacToe';
import { store } from './app/store';

function App() {
  return (
   <Provider store={store}>

      <TicTacToe />
   </Provider>
  );
}

export default App;
