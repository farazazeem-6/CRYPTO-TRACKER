import Header from "../components/Header";
import { Outlet } from "react-router-dom";
import { makeStyles } from "@mui/styles";
import { createTheme, ThemeProvider } from "@mui/material";
import "../index.css";

const useStyles = makeStyles(() => ({
  App: {
    backgroundColor: "#14161a",
    minHeight: "100vh",
    color: "white",
  },
}));
const theme = createTheme({
  typography: {
    fontFamily: "Montserrat, sans-serif",
  },
});
function Layout() {
  const classes = useStyles();
  return (
    <div className={classes.App}>
      <ThemeProvider theme={theme}>
        <Header />
        <Outlet />
      </ThemeProvider>
    </div>
  );
}

export default Layout;
