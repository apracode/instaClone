import React from "react";
import {
  Typography,
  Avatar,
  IconButton,
  makeStyles,
  useMediaQuery
} from "@material-ui/core";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import { useMutation } from "@apollo/react-hooks";

import { ADD_OR_REMOVE_FROM_QUEUE } from "../graphql/mutations";

const useStyles = makeStyles(theme => ({
  avatar: {
    width: 44,
    height: 44
  },
  text: {
    textOverflow: "ellipsis",
    overflow: "hidden"
  },
  container: {
    display: "grid",
    gridAutoFlow: "column",
    gridTemplateColumns: "50px auto 50px",
    gridGap: 12,
    alignItems: "center",
    marginTop: 10
  },
  songInfoContainer: {
    overflow: "hidden",
    whiteSpace: "nowrap"
  }
}));

function QueedSongList({ queue }) {
  const greaterThenMd = useMediaQuery(theme => theme.breakpoints.up("md"));

  return (
    greaterThenMd && (
      <div
        style={{
          margin: "10px 0",
          border: "1px solid black",
          padding: "10px",
          borderRadius: "5px"
        }}
      >
        <Typography color="textSecondary" variant="button">
          QUEUE ({queue.length})
        </Typography>
        {queue.map((song, index) => {
          return <QueuedSong key={index} song={song} />;
        })}
      </div>
    )
  );
}

const QueuedSong = ({ song }) => {
  const classes = useStyles();
  
  const [addOrRemoveFromQueue] = useMutation(ADD_OR_REMOVE_FROM_QUEUE, {
    onCompleted: data => {
      localStorage.setItem("queue", JSON.stringify(data.addOrRemoveFromQueue));
    }
  });

  const handleAddOrRemoveSongFromQueue = () => {
    addOrRemoveFromQueue({
      variables: { input: { ...song, __typename: "Song" } }
    });
  };

  return (
    <div className={classes.container}>
      <Avatar className={classes.avatar} src={song.img} alt="Song Image" />
      <div className={classes.songInfoContainer}>
        <Typography className={classes.text} variant="subtitle2">
          {song.title}
        </Typography>
        <Typography className={classes.text} variant="body2">
          {song.artist}
        </Typography>
      </div>
      <IconButton onClick={handleAddOrRemoveSongFromQueue}>
        <DeleteForeverIcon color="error" />
      </IconButton>
    </div>
  );
};

export default QueedSongList;
