import { makeStyles } from "@mui/styles";
import useFetchTrendingCoins from "../../hooks/useFetchTrendingCoins";
import { useSelector } from "react-redux";
import "react-alice-carousel/lib/alice-carousel.css";
import AliceCarousel from "react-alice-carousel";
import { Link } from "react-router-dom";
import { addCommas } from "../../utils/helperFunction";
import { Box } from "@mui/material";

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
    textDecoration: "none", // Remove link underline
  },
}));

function Carousel() {
  const currentCurrency = useSelector((state) => state.currency.currency);
  const currentSymbol = useSelector((state) => state.currency.symbol);
  const trendingCoins = useSelector(
    (state) => state.trendingCoins.trendingCoins
  );

  // Calling the trending coin fetching hook
  useFetchTrendingCoins(currentCurrency);

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
        <Link className={classes.carouselItem} to={`/coin/${coin.id}`} key={coin.id}>
          {/* RESPONSIVE IMAGE */}
          <Box
            component="img"
            src={coin.image}
            alt={coin.name}
            sx={{
              width: { xs: "50px", sm: "65px", md: "80px" }, // 50px on mobile, 80px on desktop
              height: { xs: "50px", sm: "65px", md: "80px" },
              marginBottom: { xs: "6px", sm: "8px", md: "10px" },
              objectFit: "contain",
            }}
          />

          {/* SYMBOL & PERCENTAGE CHANGE */}
          <Box
            sx={{
              display: "flex",
              gap: { xs: 0.5, sm: 0.75, md: 1 }, // Smaller gap on mobile
              alignItems: "center",
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          >
            {/* COIN SYMBOL */}
            <Box
              component="span"
              sx={{
                textTransform: "uppercase",
                color: "white",
                fontSize: { xs: "0.75rem", sm: "0.875rem", md: "1rem" }, // 12px on mobile
                fontWeight: 500,
              }}
            >
              {coin.symbol}
            </Box>

            {/* PERCENTAGE CHANGE */}
            <Box
              component="span"
              sx={{
                color: profit ? "rgb(14,203,129)" : "red",
                fontWeight: 600,
                fontSize: { xs: "0.7rem", sm: "0.8rem", md: "0.9rem" }, // 11px on mobile
              }}
            >
              {profit && "+"}
              {coin.price_change_percentage_24h.toFixed(2)}%
            </Box>
          </Box>

          {/* CURRENT PRICE */}
          <Box
            component="span"
            sx={{
              marginTop: { xs: "6px", sm: "8px", md: "10px" },
              color: "white",
              fontSize: { xs: "0.9rem", sm: "1.1rem", md: "1.25rem" }, // 14px on mobile, 20px desktop
              fontWeight: 700,
            }}
          >
            {currentSymbol && currentSymbol} {addCommas(coin.current_price)}
          </Box>
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