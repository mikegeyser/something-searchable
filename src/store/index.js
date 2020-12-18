import { combineReducers } from '@reduxjs/toolkit';
import { configureStore } from '@reduxjs/toolkit';

import app from './app';
import search from './search';

const reducer = combineReducers({
  app,
  search,
});

export const store = configureStore({
  reducer,
});
