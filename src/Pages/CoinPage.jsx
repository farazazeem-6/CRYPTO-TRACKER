import useFetchSingleCoin from "../hooks/useFetchSingleCoin";
import { useSelector } from "react-redux";
import { addCommas } from "../utils/helperFunction";
import { useParams } from "react-router-dom";
import CoinInfo from "../components/CoinInfo";
import { LinearProgress } from "@mui/material";
import styles from "../styles/CoinPage.module.css";

const CoinPage = () => {
  const { id } = useParams();
  useFetchSingleCoin(id);

  const coinData = useSelector((state) => state.singleCoin.singleCoin);
  const currentCurrency = useSelector((state) => state.currency.currency);
  const currentSymbol = useSelector((state) => state.currency.symbol);

  if (!coinData) return <LinearProgress style={{ backgroundColor: "gold" }} />;

  return (
    <div className={styles.coinPageContainer}>
      <div className={styles.coinSidebar}>
        <div className={styles.upperSection}>
          <img
            className={styles.imgStyle}
            src={coinData?.image?.large}
            alt={coinData?.name}
          />
          <h4 className={styles.coinHeading}>{coinData?.name}</h4>
          <p className={styles.description}>
            {coinData?.description?.en.split(". ")[0]}.
          </p>
        </div>
        <div className={styles.marketData}>
          <span>
            <h5 className={styles.heading5}>Rank:</h5>
            &nbsp; &nbsp;
            <h6 className={styles.heading6}>{coinData?.market_cap_rank}</h6>
          </span>

          <span>
            <h5 className={styles.heading5}>Current Price:</h5>
            &nbsp; &nbsp;
            <h6 className={styles.heading6}>
              {currentSymbol}{" "}
              {addCommas(
                coinData?.market_data?.current_price[
                  currentCurrency.toLowerCase()
                ] ?? 0
              )}
            </h6>
          </span>

          <span>
            <h5 className={styles.heading5}>Market Cap:</h5>
            &nbsp; &nbsp;
            <h6 className={styles.heading6}>
              {currentSymbol}{" "}
              {addCommas(
                Math.floor(
                  (coinData?.market_data?.market_cap?.[
                    currentCurrency.toLowerCase()
                  ] ?? 0) / 1_000_000
                )
              )}{" "}
              M
            </h6>
          </span>
        </div>
      </div>
      <CoinInfo coin={coinData.id} />
    </div>
  );
};

export default CoinPage;
