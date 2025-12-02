import axios from "axios";
import { CoinList } from "../constants/api";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { addAllCoins } from "../store/slices/AllCoins";

function useFetchAllCoins(currency) {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchAllCoins = async () => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await axios.get(CoinList(currency));
      dispatch(addAllCoins(data));
    } catch (error) {
      console.error("Failed to fetch all coins:", error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!currency) return;
    fetchAllCoins();
  }, [currency]);
  return { loading, error };
}

export default useFetchAllCoins;
