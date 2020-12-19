import { createSlice } from '@reduxjs/toolkit';
import { search } from '../services';

const { actions, reducer } = createSlice({
  name: 'search',
  initialState: { query: '', results: [], total: 0, page: 0 },
  reducers: {
    setQuery(state, { payload }) {
      state.query = payload;
    },
    searchResultsReceived(state, { payload: { items, total_count } }) {
      state.results = items;
      state.total = total_count;
    },
  },
});

export const { setQuery, searchResultsReceived } = actions;
export default reducer;

export const performSearch = (query, page) => async (dispatch) => {
  const results = await search(query, page);
  dispatch(searchResultsReceived(results));
};
