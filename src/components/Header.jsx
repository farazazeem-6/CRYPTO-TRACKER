import {
  AppBar,
  Container,
  Select,
  Typography,
  MenuItem,
  Toolbar,
  createTheme,
  ThemeProvider,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import {changeCurrency} from '../store/slices/currencySlice'

const useStyles = makeStyles(() => ({
  title: {
    color: "gold",
    flex: 1,
    cursor: "pointer",
  },
}));

function Header() {
  const navigate = useNavigate();
  const classes = useStyles();
  // const [input, setInput] = useState("PKR");
  const currency = useSelector((state) => state.currency.currency);
  const dispatch = useDispatch();
  currency&& console.log(currency);
  

  const darkTheme = createTheme({
    palette: {
      primary: {
        main: "#fff",
      },
      type: "dark",
    },
  });
  return (
    <ThemeProvider theme={darkTheme}>
      <div>
        <AppBar color="transparent" position="static">
          <Container>
            <Toolbar>
              <Typography
                onClick={() => navigate("/")}
                sx={{
                  fontWeight: "bolder",
                  fontFamily: "Montserrat, sans-serif",
                }}
                className={classes.title}
              >
                Crypto Hunter
              </Typography>
              <Select
                value={currency}
                onChange={(e) => dispatch(changeCurrency(e.target.value))}
                variant="outlined"
                sx={{
                  width: 100,
                  height: 40,
                  ml: 2,
                  color: "white",
                  borderColor: "white",
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "white",
                  },
                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: "white",
                  },
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderColor: "white",
                  },
                  "& .MuiSvgIcon-root": {
                    color: "white",
                  },
                }}
              >
                <MenuItem value={"USD"}>USD</MenuItem>
                <MenuItem value={"PKR"}>PKR</MenuItem>
                <MenuItem value={"INR"}>INR</MenuItem>
              </Select>
            </Toolbar>
          </Container>
        </AppBar>
      </div>
    </ThemeProvider>
  );
}

export default Header;
