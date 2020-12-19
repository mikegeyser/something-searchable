import { h, render } from 'preact';
import { Header, Results, Search } from './components';
import { store } from './store';
import { Provider } from 'react-redux';

import './index.css';

const App = (
  <Provider store={store}>
    <Header />
    <Search />
    <Results />
  </Provider>
);

render(App, document.body);
