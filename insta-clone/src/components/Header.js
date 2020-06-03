import React from "react";

import { AppBar, Toolbar, Typography, makeStyles } from "@material-ui/core";
import HeadsetTwoToneIcon from "@material-ui/icons/HeadsetTwoTone";

const useStyles = makeStyles(theme => ({
  title: {
    marginLeft: theme.spacing(2)
  },
}));

function Header() {
  const classes = useStyles();

  return (
    <>
      <AppBar color="secondary" position="fixed">
        <Toolbar>
          <HeadsetTwoToneIcon />
          <Typography className={classes.title} variant="h6" component="h1">
            Music Room
          </Typography>
        </Toolbar>
      </AppBar>
    </>
  );
}

export default Header;
