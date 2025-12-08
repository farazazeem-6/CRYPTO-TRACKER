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
  Box,
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
      <Container sx={{ textAlign: "center" }}>
        <Typography
          variant="h4"
          sx={{
            margin: { xs: "12px", sm: "18px" },
            fontFamily: "Montserrat, sans-serif",
            fontSize: { xs: "1.25rem", sm: "1.75rem", md: "2.125rem" }, // Smaller on mobile
          }}
        >
          Cryptocurrency Prices by Market Cap
        </Typography>

        <TextField
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          label="Search For a Crypto Currency.."
          variant="outlined"
          sx={{
            marginBottom: 2,
            width: "100%",
            "& .MuiOutlinedInput-root": {
              fontSize: { xs: "0.8rem", sm: "0.9rem", md: "1rem" }, // Smaller on mobile
            },
            "& .MuiInputLabel-root": {
              fontSize: { xs: "0.8rem", sm: "0.9rem", md: "1rem" }, // Smaller label
            },
          }}
        />

        <TableContainer
          sx={{
            "&::-webkit-scrollbar": {
              height: "8px",
            },
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: "gold",
              borderRadius: "4px",
            },
          }}
        >
          {loading ? (
            <LinearProgress style={{ backgroundColor: "gold" }} />
          ) : (
            <Table
              sx={{
                minWidth: { xs: 300, sm: 500, md: 650 },
              }}
            >
              <TableHead style={{ backgroundColor: "#EEBC1D" }}>
                <TableRow>
                  {["Coin", "Price", "24h Change", "Market Cap"].map((head) => (
                    <TableCell
                      sx={{
                        color: "black",
                        fontWeight: 700,
                        fontFamily: "Montserrat, sans-serif",
                        fontSize: { xs: "0.65rem", sm: "0.8rem", md: "1rem" }, // Much smaller on mobile
                        padding: { xs: "6px 4px", sm: "10px 12px", md: "16px" }, // Tighter padding
                        display:
                          head === "Market Cap"
                            ? { xs: "none", sm: "table-cell" }
                            : "table-cell",
                      }}
                      key={head}
                      align={head === "Coin" ? "left" : "right"}
                    >
                      {head}
                    </TableCell>
                  ))}
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
                        {/* Coin Cell */}
                        <TableCell
                          component="th"
                          scope="row"
                          sx={{
                            verticalAlign: "middle",
                            padding: {
                              xs: "6px 4px",
                              sm: "10px 12px",
                              md: "16px",
                            },
                          }}
                        >
                          <Box
                            sx={{
                              display: "flex",
                              gap: { xs: 0.5, sm: 1, md: 2 }, // Smaller gap on mobile
                              alignItems: "center",
                            }}
                          >
                            {/* SMALLER IMAGE ON MOBILE */}
                            <Box
                              component="img"
                              src={row.image}
                              alt={row.name}
                              sx={{
                                width: { xs: "28px", sm: "40px", md: "50px" }, // 28px on mobile!
                                height: { xs: "28px", sm: "40px", md: "50px" },
                                objectFit: "contain",
                              }}
                            />
                            <Box
                              sx={{
                                display: "flex",
                                flexDirection: "column",
                              }}
                            >
                              {/* SMALLER SYMBOL TEXT ON MOBILE */}
                              <Box
                                component="span"
                                sx={{
                                  textTransform: "uppercase",
                                  fontSize: {
                                    xs: "0.75rem",
                                    sm: "1rem",
                                    md: "1.375rem",
                                  }, // 12px on mobile!
                                  fontWeight: 500,
                                }}
                              >
                                {row.symbol}
                              </Box>
                              {/* Hide full name on mobile */}
                              <Box
                                component="span"
                                sx={{
                                  color: "darkgray",
                                  fontSize: {
                                    xs: "0.65rem",
                                    sm: "0.75rem",
                                    md: "0.875rem",
                                  },
                                  display: { xs: "none", sm: "block" },
                                }}
                              >
                                {row.name}
                              </Box>
                            </Box>
                          </Box>
                        </TableCell>

                        {/* Price Cell */}
                        <TableCell
                          align="right"
                          sx={{
                            fontWeight: 600,
                            fontFamily: "Montserrat, sans-serif",
                            fontSize: {
                              xs: "0.7rem",
                              sm: "0.85rem",
                              md: "1rem",
                            }, // Smaller on mobile
                            padding: {
                              xs: "6px 4px",
                              sm: "10px 12px",
                              md: "16px",
                            },
                          }}
                        >
                          <Box
                            component="span"
                            sx={{ display: { xs: "none", sm: "inline" } }}
                          >
                            {currentSymbol}{" "}
                          </Box>
                          {addCommas(row.current_price.toFixed(2))}
                        </TableCell>

                        {/* 24h Change Cell */}
                        <TableCell
                          align="right"
                          sx={{
                            color: profit ? "rgb(14,203,129)" : "red",
                            fontWeight: 600,
                            fontFamily: "Montserrat, sans-serif",
                            fontSize: {
                              xs: "0.7rem",
                              sm: "0.85rem",
                              md: "1rem",
                            }, // Smaller on mobile
                            padding: {
                              xs: "6px 4px",
                              sm: "10px 12px",
                              md: "16px",
                            },
                          }}
                        >
                          {profit && "+"}
                          {row.price_change_percentage_24h.toFixed(2)}%
                        </TableCell>

                        {/* Market Cap Cell - Hidden on mobile */}
                        <TableCell
                          align="right"
                          sx={{
                            fontFamily: "Montserrat, sans-serif",
                            fontWeight: 600,
                            fontSize: {
                              xs: "0.7rem",
                              sm: "0.85rem",
                              md: "1rem",
                            },
                            padding: {
                              xs: "6px 4px",
                              sm: "10px 12px",
                              md: "16px",
                            },
                            display: { xs: "none", sm: "table-cell" },
                          }}
                        >
                          {currentSymbol}{" "}
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
          sx={{
            padding: { xs: 1.5, sm: 2.5 },
            width: "100%",
            display: "flex",
            justifyContent: "center",
            "& .MuiPaginationItem-root": {
              fontSize: { xs: "0.7rem", sm: "0.85rem" }, // Smaller pagination
              minWidth: { xs: "28px", sm: "32px" },
              height: { xs: "28px", sm: "32px" },
            },
          }}
          classes={{ ul: classes.pagination }}
          count={Math.ceil(handleSearch()?.length / 10)}
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
