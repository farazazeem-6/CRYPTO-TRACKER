import { configureStore } from "@reduxjs/toolkit";
import CurrencyReducer from "../store/slices/currencySlice";
import TrendingCoinsReducer from "../store/slices/TrendingCoins";
import AllCoinsReducer from "../store/slices/AllCoins";

const appStore = configureStore({
  reducer: {
    currency: CurrencyReducer,
    trendingCoins: TrendingCoinsReducer,
    allCoins: AllCoinsReducer,
  },
});

export default appStore;
