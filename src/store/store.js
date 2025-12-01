import { configureStore } from "@reduxjs/toolkit";
import CurrencyReducer from "../store/slices/currencySlice";
import TrendingCoinsReducer from '../store/slices/TrendingCoins'

const appStore = configureStore({
  reducer: {
    currency: CurrencyReducer,
    trendingCoins: TrendingCoinsReducer,
  },
});

export default appStore;
