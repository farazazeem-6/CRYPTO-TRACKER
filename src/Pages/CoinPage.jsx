import useFetchSingleCoin from "../hooks/useFetchSingleCoin";
import { useSelector } from "react-redux";
import { addCommas } from "../utils/helperFunction";
import { useParams } from "react-router-dom";
import CoinInfo from "../components/CoinInfo";
import { LinearProgress, Typography } from "@mui/material";
import "../styles/CoinPage.css";

const styles = {
  container: {
    display: "flex",
  },
  sidebar: {
    width: "30%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: 25,
    borderRight: "2px solid grey",
  },
  heading: {
    fontWeight: "bold",
    marginBottom: 20,
    fontFamily: "Montserrat",
  },
  description: {
    width: "100%",
    fontFamily: "Montserrat",
    padding: 25,
    paddingBottom: 15,
    paddingTop: 0,
    textAlign: "justify",
  },
  marketData: {
    alignSelf: "start",
    padding: 25,
    paddingTop: 10,
    width: "100%",
  },
};

const CoinPage = () => {
  const { id } = useParams();
  useFetchSingleCoin(id);

  const coinData = useSelector((state) => state.singleCoin.singleCoin);
  const currentCurrency = useSelector((state) => state.currency.currency);
  const currentSymbol = useSelector((state) => state.currency.symbol);

  if (!coinData) return <LinearProgress style={{ backgroundColor: "gold" }} />;

  return (
    <div className="coin-page-container">
      <div className="coin-sidebar">
        <div className="upper-section">
        <img src={coinData?.image?.large} alt={coinData?.name} />
        <h4 className="coin-heading">{coinData?.name}</h4>
        <p>{coinData?.description?.en.split(". ")[0]}.</p>
        </div>
        <div className="market-data">
          <span>
            <h5>Rank:</h5>
            &nbsp; &nbsp;
            <h6>{coinData?.market_cap_rank}</h6>
          </span>

          <span>
            <h5>Current Price:</h5>
            &nbsp; &nbsp;
            <h6>
              {currentSymbol}{" "}
              {addCommas(
                coinData?.market_data?.current_price[
                  currentCurrency.toLowerCase()
                ] ?? 0
              )}
            </h6>
          </span>

          <span>
            <h5>Market Cap:</h5>
            &nbsp; &nbsp;
            <h6>
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
      <CoinInfo coin={coinData} />
    </div>
  );
};

export default CoinPage;
