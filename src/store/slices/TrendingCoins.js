import { createSlice } from "@reduxjs/toolkit";

const trendingCoins = createSlice({
  name: "trendingCoins",
  initialState: {
    trendingCoins: [],
  },
  reducers: {
    addTrendingCoins: (state, action) => {
      state.trendingCoins = action.payload;
    },
  },
});

export const { addTrendingCoins } = trendingCoins.actions;
export default trendingCoins.reducer;
