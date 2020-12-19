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

let token;
const getHeaders = async () => {
  if (!token) {
    console.log(process.env.NODE_ENV);
    const request = '/api/token';
    const response = await fetch(request, { method: 'post' });
    token = await response.text();
  }

  return { Authorization: `token ${token}` };
};

export const performSearch = (query, page) => async (dispatch) => {
  const request = `${api}?q=${query}&page=${page}&per_page=${perPage}`;
  const headers = await getHeaders();
  const response = await fetch(request, { headers });
  const results = await response.json();

  dispatch(searchResultsReceived(results));
};
