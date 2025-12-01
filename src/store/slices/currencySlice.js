import { createSlice } from "@reduxjs/toolkit";

const currencySlice = createSlice({
  name: "currency",
  initialState: {
    currency: "PKR",
    symbol: "Rs",
  },
  reducers: {
    setCurrency: (state, action) => {
      state.currency = action.payload;

      if (action.payload === "USD") {
        state.symbol = "$";
      } else if (action.payload === "PKR") {
        state.symbol = "Rs";
      } else if (action.payload === "INR") {
        state.symbol = "₹";
      }
    },
  },
});

export const { changeCurrency } = currencySlice.actions;
export default currencySlice.reducer;
