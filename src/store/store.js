import { configureStore } from "@reduxjs/toolkit";
import CurrencyReducer from "../store/slices/currencySlice";

const appStore = configureStore({
  reducer: {
    currency: CurrencyReducer,
  },
});

export default appStore;
