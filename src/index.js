import { h, render } from 'preact';
import { Header } from './components';
import { store } from './store';
import { Provider } from 'react-redux';

const App = (
  <Provider store={store}>
    <Header></Header>
  </Provider>
);

render(App, document.body);
