import { h, render } from 'preact';
import { Header, Pagination, Results, Search } from './components';
import { store } from './store';
import { Provider } from 'react-redux';

const App = (
  <Provider store={store}>
    <Header />
    <Search />
    <Results />
    <Pagination />
  </Provider>
);

render(App, document.body);
