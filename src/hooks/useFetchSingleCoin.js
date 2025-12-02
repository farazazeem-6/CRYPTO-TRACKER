import axios from "axios";
import { SingleCoin } from "../constants/api";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { addSingleCoin } from "../store/slices/SingleCoin";

function useFetchSingleCoin(id) {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchSingleCoin = async () => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await axios.get(SingleCoin(id));
      dispatch(addSingleCoin(data));
    } catch (error) {
      console.error("Failed to fetch all coins:", error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!id) return;
    fetchSingleCoin();
  }, [id]);
  return { loading, error };
}

export default useFetchSingleCoin;
