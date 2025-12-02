import { makeStyles } from "@mui/styles";

function SelectedButton({ children, selected, onClick }) {
  const useStyles = makeStyles(() => ({
    selectedButton: {
      border: "2px solid gold",
      padding: "10px 20px",
      cursor: "pointer",
      color: selected ? "black" : "",
      fontWeight: selected ? 800 : 500,
      backgroundColor: selected ? "gold" : "",
    },
  }));

  const classes = useStyles();
  return (
    <span onClick={onClick} className={classes.selectedButton}>
      {children}
    </span>
  );
}

export default SelectedButton;
