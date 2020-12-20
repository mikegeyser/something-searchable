import { createSlice } from '@reduxjs/toolkit';
import { search, user } from '../services';

const perPage = 10;

const { actions, reducer } = createSlice({
  name: 'search',
  initialState: {
    query: '',
    results: [],
    actualTotal: 0,
    total: 0,
    page: 1,
    numberOfPages: 0,
  },
  reducers: {
    setQuery(state, { payload }) {
      state.query = payload;
    },
    searchResultsReceived(state, { payload: { items, total_count } }) {
      state.results = items;
      state.actualTotal = total_count;
      state.total = Math.min(state.actualTotal, 1000); // Only the first 1000 results are available via the api, with my account level.
      state.numberOfPages = Math.ceil(state.total / perPage);
    },
    pageChanged(state, { payload: page }) {
      state.page = page;
    },
    userDetailsReceived(state, { payload: userDetails }) {
      const result = state.results.find(
        ({ login }) => login === userDetails.login
      );

      if (result) Object.assign(result, userDetails);
    },
  },
});

export default reducer;

export const {
  setQuery,
  searchResultsReceived,
  pageChanged,
  userDetailsReceived,
} = actions;

export const performSearch = (query) => async (dispatch) => {
  const page = 1; // Always start at the beginning again.
  const results = await search(query, page, perPage);
  dispatch(pageChanged(page));
  dispatch(searchResultsReceived(results));
  dispatch(fetchUserDetailsForResults(results));
};

export const performPagination = (page) => async (dispatch, getState) => {
  const { query } = getState().search;
  const results = await search(query, page, perPage);
  dispatch(pageChanged(page));
  dispatch(searchResultsReceived(results));
  dispatch(fetchUserDetailsForResults(results));
};

const fetchUserDetailsForResults = (results) => (dispatch) => {
  results.items.map(({ login }) => dispatch(fetchUserDetails(login)));
};

const fetchUserDetails = (login) => async (dispatch) => {
  const userDetails = await user(login);
  dispatch(userDetailsReceived(userDetails));
};
