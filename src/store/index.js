import { combineReducers } from '@reduxjs/toolkit';
import { configureStore } from '@reduxjs/toolkit';
import app from './app';

const reducer = combineReducers({
  app,
});

export const store = configureStore({
  reducer,
});
