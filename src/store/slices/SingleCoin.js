import { createSlice } from "@reduxjs/toolkit";

const singleCoin = createSlice({
  name: "singleCoin",
  initialState: {
    singleCoin: [],
  },
  reducers: {
    addSingleCoin: (state, action) => {
      state.singleCoin = action.payload;
    },
  },
});

export const { addSingleCoin } = singleCoin.actions;
export default singleCoin.reducer;
