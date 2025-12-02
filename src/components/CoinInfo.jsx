import { useSelector } from "react-redux";
import styles from "../styles/CoinInfo.module.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { HistoricalChart } from "../constants/api";
import { CircularProgress } from "@mui/material";
import { Line } from "react-chartjs-2";
import { chartDays } from "../utils/constants";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import SelectedButton from "./SelectedButton";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function CoinInfo({ coin }) {
  const [historyData, setHistoryData] = useState();
  const [days, setDays] = useState(1);
  const currentCurrency = useSelector((state) => state.currency.currency);
  const currentSymbol = useSelector((state) => state.currency.symbol);

  useEffect(() => {
    const fetchHistoryData = async () => {
      try {
        const { data } = await axios.get(
          HistoricalChart(coin, days, currentCurrency)
        );
        setHistoryData(data.prices);
      } catch (error) {
        console.error("Error fetching history data:", error);
      }
    };

    if (coin) {
      fetchHistoryData();
    }
  }, [coin, currentCurrency, days]);

  return (
    <div className={styles.container}>
      {!historyData ? (
        <CircularProgress style={{ color: "gold" }} size={250} thickness={1} />
      ) : (
        <>
          <Line
            data={{
              labels: historyData.map((coin) => {
                let date = new Date(coin[0]);
                let time =
                  date.getHours() > 12
                    ? `${date.getHours() - 12}:${date.getMinutes()} PM`
                    : `${date.getHours()}:${date.getMinutes()} AM`;
                return days === 1 ? time : date.toLocaleDateString();
              }),
              datasets: [
                {
                  label: `${coin} Price (${currentSymbol})`,
                  data: historyData.map((coin) => coin[1]),
                  borderColor: "#eebc1d",
                },
              ],
            }}
            options={{
              elements: {
                point: {
                  radius: 1,
                },
              },
            }}
          />
          <div
            style={{
              display: "flex",
              marginTop: 20,
              justifyContent: "space-around",
              width: "100%",
            }}
          >
            {chartDays.map((day) => (
              <SelectedButton
                key={day.value}
                onClick={() => setDays(day.value)}
                selected={day.value === days}
              >
                {day.label}
              </SelectedButton>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default CoinInfo;
