import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  baseUrl: 'http://localhost:5000',
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
