import React, { useContext, useEffect, useState } from "react";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  IconButton,
  makeStyles
} from "@material-ui/core";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import CircularProgress from "@material-ui/core/CircularProgress";
import SaveIcon from "@material-ui/icons/Save";
import { useSubscription, useMutation } from "@apollo/react-hooks";
import PauseIcon from "@material-ui/icons/Pause";


import { GET_SONGS } from "../graphql/subscriptions";
import { ADD_OR_REMOVE_FROM_QUEUE } from "../graphql/mutations";
import { SongPlayContext } from "../App";

const useStyles = makeStyles(theme => ({
  card: {
    background: "#212121",
    margin: theme.spacing(3),
    color: "#e0e0e0"
  },

  songInfoContainer: {
    display: "flex",
    alignItems: "center"
  },
  songInfo: {
    width: "100%",
    display: "flex",
    justifyContent: "space-between"
  },
  songImage: {
    objectFit: "cover",
    width: 140,
    height: 140
  }
}));

function SongList() {
  const { data, loading, error } = useSubscription(GET_SONGS);

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: "50px"
        }}
      >
        Loading...
        <CircularProgress color="secondary" />
      </div>
    );
  }
  if (error) {
    return <div>Error fetching songs</div>;
  }

  return (
    <div>
      {data.songs.map(song => {
        return <Song key={song.id} song={song} />;
      })}
    </div>
  );
}

const Song = ({ song }) => {
  const classes = useStyles();

  const { state, dispatch } = useContext(SongPlayContext);
  
  const [currentSongPlaying, setCurrentSongPlaying] = useState(false);

  const [addOrRemoveFromQueue] = useMutation(ADD_OR_REMOVE_FROM_QUEUE, {
    onCompleted: data => {
      localStorage.setItem("queue", JSON.stringify(data.addOrRemoveFromQueue));
    }
  });

  useEffect(() => {
    const isSongPlaying = state.isPlaying && song.id === state.song.id;
    setCurrentSongPlaying(isSongPlaying);
  }, [song.id, state.song.id, state.isPlaying]);

  const handleTooglePlay = () => {
    dispatch({ type: "SET_SONG", payload: { song } });
    dispatch(state.isPlaying ? { type: "PAUSE_SONG" } : { type: "PLAY_SONG" });
  };

  const handleAddOrRemoveSongFromQueue = () => {
    addOrRemoveFromQueue({
      variables: { input: { ...song, __typename: "Song" } }
    });
  };

  return (
    <Card className={classes.card}>
      <div className={classes.songInfoContainer}>
        <CardMedia image={song.img} className={classes.songImage} />
        <div className={classes.songInfo}>
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {song.title}
            </Typography>
            <Typography variant="body1" component="p">
              {song.artist}
            </Typography>
          </CardContent>
          <CardActions>
            <IconButton onClick={handleTooglePlay} size="small" color="primary">
              {currentSongPlaying ? (
                <PauseIcon className={classes.playIcon} color="primary" />
              ) : (
                <PlayArrowIcon className={classes.playIcon} color="primary" />
              )}
            </IconButton>
            <IconButton
              onClick={handleAddOrRemoveSongFromQueue}
              size="small"
              color="primary"
            >
              <SaveIcon />
            </IconButton>
          </CardActions>
        </div>
      </div>
    </Card>
  );
};

export default SongList;
