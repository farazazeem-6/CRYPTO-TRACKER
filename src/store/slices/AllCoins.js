import { createSlice } from "@reduxjs/toolkit";

const allCoins = createSlice({
  name: "allCoins",
  initialState: {
    allCoins: [],
  },
  reducers: {
    addAllCoins: (state, action) => {
      state.allCoins = action.payload;
    },
  },
});

export const { addAllCoins } = allCoins.actions;
export default allCoins.reducer;