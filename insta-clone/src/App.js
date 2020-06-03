import React, { createContext, useContext, useReducer } from "react";
// eslint-disable-next-line
import style from "./App.css";
import Header from "./components/Header";
import AddSong from "./components/AddSong";
import SongList from "./components/SongList";
import SongPlayer from "./components/SongPlayer";
import songReducer from "./reducer";

import { Grid, makeStyles, useMediaQuery, Hidden } from "@material-ui/core";

export const SongPlayContext = createContext({
  song: {
    id: "",
    title: "",
    artist: "",
    url: "",
    img: " ",
    duration: 0
  },
  isPlaying: false
});

const useStyles = makeStyles(theme => ({
  app: {
    background: "#e0e0e0",
    paddingTop: "64px",
    minHeight: "100vh"
  },
  appSm: {
    background: "#e0e0e0",
    paddingTop: "10px",
    minHeight: "100vh"
  }
}));

function App() {
  const initialSongState = useContext(SongPlayContext);

  const [state, dispatch] = useReducer(songReducer, initialSongState);
  
  const greaterThenMd = useMediaQuery(theme => theme.breakpoints.up("md"));
  const greaterThenSm = useMediaQuery(theme => theme.breakpoints.up("sm"));

  const classes = useStyles();

  return (
    <SongPlayContext.Provider value={{ state, dispatch }}>
      <Hidden only="xs">
        <Header />
      </Hidden>
      <Grid
        className={greaterThenSm ? classes.app : classes.appSm}
        container
        spacing={3}
      >
        <Grid item xs={12} md={7}>
          <AddSong />
          <SongList />
        </Grid>
        <Grid
          style={
            greaterThenMd
              ? {
                  position: "fixed",
                  width: "100%",
                  right: 0,
                  top: 70
                }
              : {
                  position: "fixed",
                  left: 0,
                  bottom: 0,
                  width: "100%"
                }
          }
          item
          xs={12}
          md={5}
        >
          <SongPlayer />
        </Grid>
      </Grid>
    </SongPlayContext.Provider>
  );
}

export default App;
