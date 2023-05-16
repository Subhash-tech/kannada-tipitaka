import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStylesBootstrap = makeStyles((theme) => ({
  arrow: {
    color: theme.palette.common.black,
  },
  tooltip: {
    backgroundColor: theme.palette.common.black,
  },
}));

export default function Tooltip(props) {
  const classes = useStylesBootstrap();

  return (
    <Tooltip arrow classes={classes} title={props.title}>
      {props.children}
    </Tooltip>
  );
}
