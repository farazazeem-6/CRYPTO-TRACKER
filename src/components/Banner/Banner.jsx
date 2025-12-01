import { Container, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import Carousel from "./Carousel";

const useStyles = makeStyles(() => ({
  banner: {
    backgroundImage: "url(./banner.jpg)",
  },
  bannerContent: {
    height: 400,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
    paddingTop: 25,
  },
  tagLine: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    height: "40%",
    textAlign: "center",
  },
}));
const Banner = () => {
  const classes = useStyles();
  return (
    <div className={classes.banner}>
      <Container className={classes.bannerContent}>
        <div className={classes.tagLine}>
          <Typography variant="h2" sx={{ fontWeight: "bold", marginBottom: 5 }}>
            Crypto Hunter
          </Typography>
          <Typography variant="subtitle2" sx={{ textTransform: "capitalize" }}>
            Get all the Info regarding your favourite Crypto Coin.
          </Typography>
        </div>
        <Carousel />
      </Container>
    </div>
  );
};

export default Banner;
