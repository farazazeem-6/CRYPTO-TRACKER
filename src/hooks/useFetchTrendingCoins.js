import axios from "axios";
import { TrendingCoins } from "../constants/api";
import { useDispatch } from "react-redux";
import { addTrendingCoins } from "../store/slices/TrendingCoins";
import { useEffect, useState } from "react";

function useFetchTrendingCoins(currency) {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchTrendingToken = async () => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await axios.get(TrendingCoins(currency));
      dispatch(addTrendingCoins(data));
    } catch (error) {
      console.error("Failed to fetch trending coins:", error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!currency) return;
    fetchTrendingToken();
  }, [currency]);
  return { loading, error };
}

export default useFetchTrendingCoins;
