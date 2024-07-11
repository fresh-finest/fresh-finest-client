import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  baseUrl: 'https://fresh-finest-server-dd57784051b3.herokuapp.com',
};

const baseUrlSlice = createSlice({
  name: 'baseUrl',
  initialState,
  reducers: {
    setBaseUrl: (state, action) => {
      state.baseUrl = action.payload;
    },
  },
});

export const { setBaseUrl } = baseUrlSlice.actions;
export default baseUrlSlice.reducer;
