import { createSlice } from '@reduxjs/toolkit';

const { actions, reducer } = createSlice({
  name: 'app',
  initialState: { title: 'Something searchable' },
  reducers: {
    noop(state, action) {},
  },
});

export const { noop } = actions;
export default reducer;
