import { createSlice } from '@reduxjs/toolkit';

const api = 'https://api.github.com/search/users';
const perPage = 10;

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
  const request = `${api}?q=${query}&page=${page}&per_page=${perPage}`;
  const response = await fetch(request);
  const results = await response.json();

  dispatch(searchResultsReceived(results));
};
