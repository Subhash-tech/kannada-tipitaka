import React from "react";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  backdrop: {
    display: "flex",
    flexDirection: "column",
    zIndex: theme.zIndex.drawer + 1,
    background: "transparent",
    backgroundColor: "rgba(0,0,0,0.1)",
    color: theme.palette.secondary.main,
  },
}));

export default function LoadingSpinner(props) {
  const classes = useStyles();
  const isLoading = props.loading;

  return (
    <div>
      <Backdrop className={classes.backdrop} open={isLoading}>
        {props.text ? props.text : ""}
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
}
