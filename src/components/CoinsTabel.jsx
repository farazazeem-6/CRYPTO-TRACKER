import { useSelector } from "react-redux";
import useFetchAllCoins from "../hooks/useFetchAllCoins";
import {
  Container,
  createTheme,
  LinearProgress,
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  ThemeProvider,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router";
import { makeStyles } from "@mui/styles";
import { addCommas } from "../utils/helperFunction";

const useStyles = makeStyles(() => ({
  row: {
    backgroundColor: "#16171a",
    cursor: "pointer",
    "&:hover": {
      backgroundColor: "#131111",
    },
  },

  pagination: {
    "& .MuiPaginationItem-root": {
      color: "gold",
    },
  },
}));

function CoinsTabel() {
  const currentCurrency = useSelector((state) => state.currency.currency);
  const currentSymbol = useSelector((state) => state.currency.symbol);
  const { loading, error } = useFetchAllCoins(currentCurrency);
  const allCoins = useSelector((state) => state.allCoins.allCoins);
  const navigate = useNavigate();
  const [page, setPage] = useState(1);

  const [search, setSearch] = useState("");
  // console.log("Loading: " + loading + " Error: " + error);

  const darkTheme = createTheme({
    palette: {
      mode: "dark",
      primary: {
        main: "#fff",
      },
    },
  });
  const handleSearch = () => {
    return allCoins.filter(
      (coin) =>
        coin.name.toLowerCase().includes(search.toLowerCase()) ||
        coin.symbol.toLowerCase().includes(search.toLowerCase())
    );
  };

  const classes = useStyles();
  return (
    <ThemeProvider theme={darkTheme}>
      <Container style={{ textAlign: "center" }}>
        <Typography
          variant="h4"
          style={{ margin: "18px", fontFamily: "Montserrat, sans-serif" }}
        >
          Cryptocurrency Prices by Market Cap
        </Typography>
        <TextField
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          label="Search For a Crypto Currency.."
          variant="outlined"
          style={{ marginBottom: 20, width: "100%", borderColor: "white" }}
        />

        <TableContainer>
          {loading ? (
            <LinearProgress style={{ backgroundColor: "gold" }} />
          ) : (
            <Table>
              <TableHead style={{ backgroundColor: "#EEBC1D" }}>
                <TableRow>
                  {["Coin", "Price", "24h Change", "Market Cap"].map((head) => {
                    return (
                      <TableCell
                        style={{
                          color: "black",
                          fontWeight: 700,
                          fontFamily: "Montserrat, sans-serif",
                        }}
                        key={head}
                        align={head === "Coin" ? "" : "right"}
                      >
                        {head}
                      </TableCell>
                    );
                  })}
                </TableRow>
              </TableHead>
              <TableBody>
                {handleSearch()
                  .slice((page - 1) * 10, (page - 1) * 10 + 10)
                  .map((row) => {
                    let profit = row.price_change_percentage_24h >= 0;
                    return (
                      <TableRow
                        onClick={() => navigate(`/coin/${row.id}`)}
                        className={classes.row}
                        key={row.name}
                      >
                        <TableCell
                          component={"th"}
                          scope="row"
                          style={{
                            verticalAlign: "middle",
                          }}
                        >
                          <div
                            style={{
                              display: "flex",
                              gap: 15,
                              alignItems: "center",
                            }}
                          >
                            <img
                              src={row.image}
                              alt={row.name}
                              height={50}
                              style={{ marginBottom: 10 }}
                            />
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "column",
                              }}
                            >
                              <span
                                style={{
                                  textTransform: "uppercase",
                                  fontSize: 22,
                                }}
                              >
                                {row.symbol}
                              </span>
                              <span style={{ color: "darkgray" }}>
                                {row.name}
                              </span>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell
                          align="right"
                          style={{
                            fontWeight: 600,
                            fontFamily: "Montserrat, sans-serif",
                          }}
                        >
                          {currentSymbol} {""}
                          {addCommas(row.current_price.toFixed(2))}
                        </TableCell>
                        <TableCell
                          align="right"
                          style={{
                            color: profit ? "rgb(14,203,129)" : "red",
                            fontWeight: 600,
                            fontFamily: "Montserrat, sans-serif",
                          }}
                        >
                          {profit && "+"}
                          {row.price_change_percentage_24h.toFixed(2)}%
                        </TableCell>
                        <TableCell
                          align="right"
                          style={{
                            fontFamily: "Montserrat, sans-serif",
                            fontWeight: 600,
                          }}
                        >
                          {currentSymbol} {""}
                          {addCommas(row.market_cap.toString().slice(0, -6))} M
                        </TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          )}
        </TableContainer>
        <Pagination
          style={{
            padding: 20,
            width: "100%",
            display: "flex",
            justifyContent: "center",
          }}
          classes={{ ul: classes.pagination }}
          count={(handleSearch()?.length / 10).toFixed(0)}
          onChange={(_, value) => {
            setPage(value);
            window.scroll(0, 450);
          }}
        />
      </Container>
    </ThemeProvider>
  );
}
export default CoinsTabel;
