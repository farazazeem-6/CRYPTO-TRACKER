import { makeStyles } from "@mui/styles";
import useFetchTrendingCoins from "../../hooks/useFetchTrendingCoins";
import { useSelector } from "react-redux";
import "react-alice-carousel/lib/alice-carousel.css";
import AliceCarousel from "react-alice-carousel";
import { Link } from "react-router-dom";
import { addCommas } from "../../constants/helperFunction";

const useStyles = makeStyles(() => ({
  carousel: {
    height: "50%",
    display: "flex",
    alignItems: "center",
  },
  carouselItem: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
}));

function Carousel() {
  const currentCurrency = useSelector((state) => state.currency.currency);
  const currentSymbol = useSelector((state) => state.currency.symbol);
  const trendingCoins = useSelector(
    (state) => state.trendingCoins.trendingCoins
  );
  //calling the trending coin fetching hook
  useFetchTrendingCoins(currentCurrency);
  trendingCoins ? console.log(trendingCoins) : null;

  const classes = useStyles();
  const responsive = {
    0: {
      items: 2,
    },
    512: {
      items: 4,
    },
  };
  const items =
    trendingCoins &&
    trendingCoins.map((coin) => {
      let profit =
        coin.price_change_percentage_24h &&
        coin.price_change_percentage_24h >= 0;
      return (
        <Link className={classes.carouselItem} to={`/coin/${coin.id}`}>
          <img
            src={coin.image}
            alt={coin.name}
            height="80px"
            style={{ marginBottom: "10px" }}
          />
          <div style={{ display: "flex", gap: 5 }}>
            <span
              style={{
                textTransform: "uppercase",
                color: "white",
              }}
            >
              {coin.symbol}
            </span>
            <span
              style={{
                color: profit ? "rgb(14,203,129)" : "red",
                fontWeight: 500,
              }}
            >
              {profit && "+"}
              {coin.price_change_percentage_24h.toFixed(2)}
            </span>
          </div>
          <span
            style={{
              marginTop: "10px",
              color: "white",
              fontSize: "20px",
              fontWeight: 700,
            }}
          >
            {currentSymbol && currentSymbol} {addCommas(coin.current_price)}
          </span>
        </Link>
      );
    });

  return (
    <div className={classes.carousel}>
      <AliceCarousel
        mouseTracking
        infinite
        autoPlayInterval={1000}
        animationDuration={1500}
        disableDotsControls
        responsive={responsive}
        autoPlay
        disableButtonsControls
        items={items}
      />
    </div>
  );
}

export default Carousel;
