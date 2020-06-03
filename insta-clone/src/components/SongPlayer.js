import React, { useContext, useState, useRef, useEffect } from "react";
import {
  Card,
  CardContent,
  Typography,
  IconButton,
  makeStyles,
  Slider,
  CardMedia
} from "@material-ui/core";
import SkipPreviousIcon from "@material-ui/icons/SkipPrevious";
import SkipNextIcon from "@material-ui/icons/SkipNext";
import PauseIcon from "@material-ui/icons/Pause";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import { useQuery } from "@apollo/react-hooks";
import ReactPlayer from "react-player";

import { SongPlayContext } from "../App";
import QueuedSongList from "./QueuedSongList";
import { GET_QUEUED_SONGS } from "../graphql/queries";

const useStyles = makeStyles(theme => ({
  card: {
    background: "#212121",
    color: "#e0e0e0",
    display: "flex",
    justifyContent: "space-between"
  },
  details: {
    display: "flex",
    flexDirection: "column",
    padding: "0px 15px"
  },
  content: {
    flex: "1 0 auto"
  },
  image: {
    width: 150
  },
  controls: {
    display: "flex",
    alignItems: "center",
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1)
  },
  playIcon: {
    height: 38,
    width: 38
  }
}));

function SongPlayer() {
  const classes = useStyles();

  const { state, dispatch } = useContext(SongPlayContext);

  const [played, setPlayed] = useState(0);
  const [seeking, setSeeking] = useState(false);
  const [playedSeconds, setPlayedSeconds] = useState(0);
  const [positionInQueue, setPositionInQueue] = useState(0);

  const reactPlayerRef = useRef();
  
  const { data } = useQuery(GET_QUEUED_SONGS);

  useEffect(() => {
    const songIndex = data.queue.findIndex(song => song.id === state.song.id);
    setPositionInQueue(songIndex);
  }, [state.song.id, data.queue]);

  useEffect(() => {
    const nextSong = data.queue[positionInQueue + 1];
    if (played >= 0.99 && nextSong) {
      setPlayed(0);
      dispatch({ type: "SET_SONG", payload: { song: nextSong } });
    }
  }, [data.queue, played, dispatch, positionInQueue]);

  const handleTooglePlay = () => {
    dispatch(state.isPlaying ? { type: "PAUSE_SONG" } : { type: "PLAY_SONG" });
  };

  const handleSliderChange = (e, newValue) => {
    setPlayed(newValue);
  };

  const handleSeekMouseDown = () => {
    setSeeking(true);
  };
  const handleSeekMouseUp = () => {
    setSeeking(false);
    reactPlayerRef.current.seekTo(played);
  };
  const handlePlayPrevSong = () => {
    const prevSong = data.queue[positionInQueue - 1];
    if (prevSong) {
      dispatch({ type: "SET_SONG", payload: { song: prevSong } });
    }
  };

  const handlePlayNextSong = () => {
    const nextSong = data.queue[positionInQueue + 1];
    if (nextSong) {
      dispatch({ type: "SET_SONG", payload: { song: nextSong } });
    }
  };

  const formatDuration = seconds => {
    return new Date(seconds * 1000).toISOString().substr(11, 8);
  };

  return (
    <>
      <Card className={classes.card} variant="outlined">
        <div className={classes.details}>
          <CardContent className={classes.content}>
            <Typography variant="h5" component="h3">
              {state.song.title}
            </Typography>
            <Typography variant="subtitle1" component="p" color="primary">
              {state.song.artist}
            </Typography>
          </CardContent>
          <div className={classes.controls}>
            <IconButton onClick={handlePlayPrevSong}>
              <SkipPreviousIcon color="primary" />
            </IconButton>
            <IconButton onClick={handleTooglePlay}>
              {state.isPlaying ? (
                <PauseIcon className={classes.playIcon} color="primary" />
              ) : (
                <PlayArrowIcon className={classes.playIcon} color="primary" />
              )}
            </IconButton>
            <IconButton onClick={handlePlayNextSong}>
              <SkipNextIcon color="primary" />
            </IconButton>
            <Typography variant="subtitle1" component="p" color="primary">
              {formatDuration(playedSeconds)}
            </Typography>
          </div>
          <Slider
            onChange={handleSliderChange}
            onMouseDown={handleSeekMouseDown}
            onMouseUp={handleSeekMouseUp}
            value={played}
            type="range"
            min={0}
            max={1}
            step={0.01}
          />
        </div>
        <ReactPlayer
          ref={reactPlayerRef}
          onProgress={({ played, playedSeconds }) => {
            if (!seeking) {
              setPlayed(played);
              setPlayedSeconds(playedSeconds);
            }
          }}
          url={state.song.url}
          playing={state.isPlaying}
          hidden
        />
        <CardMedia className={classes.image} image={state.song.img} />
      </Card>
      <QueuedSongList queue={data.queue} />
    </>
  );
}

export default SongPlayer;
