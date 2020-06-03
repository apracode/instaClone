import React, { useState } from "react";
import ReactPlayer from "react-player";
import { useMutation } from "@apollo/react-hooks";
import {
  TextField,
  InputAdornment,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  makeStyles
} from "@material-ui/core";
import LinkTwoToneIcon from "@material-ui/icons/LinkTwoTone";
import AddBoxOutlined from "@material-ui/icons/AddBoxOutlined";

import { ADD_SONGS } from "../graphql/mutations";

const useStyles = makeStyles(theme => ({
  image: {
    maxWidth: "550px",
    minHeight: "350px",
    width: "90%"
  },
  container: {
    display: "flex",
    alignItems: "center"
  },
  urlInput: {
    margin: theme.spacing(1)
  },
  addSongButton: {
    margin: theme.spacing(1)
  },
  dialog: {
    textAlign: "center"
  }
}));

const initialSongData = {
  title: "",
  duration: 0,
  artist: "",
  img: ""
};

function AddSong() {
  const classes = useStyles();

  const [dialog, setDialog] = useState(false);
  const [url, setUrl] = useState("");
  const [song, setSong] = useState(initialSongData);

  const [addSong, { error }] = useMutation(ADD_SONGS);

  const handleCloseDialog = () => {
    setDialog(false);
  };

  const handleEditSong = async ({ player }) => {
    const nestedPlayer = player.player.player;
    let songData;
    if (nestedPlayer.getVideoData) {
      songData = getYouTubeInfo(nestedPlayer);
    } else if (nestedPlayer.getCurrentSound) {
      songData = await getSoundCloudInfo(nestedPlayer);
    }
    setSong({ ...songData, url });
  };

  async function handleAddSong() {
    try {
      const { url, img, duration, title, artist } = song;
      await addSong({
        variables: {
          url: url.length > 0 ? url : null,
          img: img.length > 0 ? img : null,
          duration: duration > 0 ? duration : null,
          title: title.length > 0 ? title : null,
          artist: artist.length > 0 ? artist : null
        }
      });
      handleCloseDialog();
      setSong(initialSongData);
      setUrl("");
    } catch (error) {
      console.error("Error adding song", error);
    }
  }

  const getYouTubeInfo = player => {
    const duration = player.getDuration();
    const { title, video_id, author } = player.getVideoData();
    const img = `http://img.youtube.com/vi/${video_id}/0.jpg`;
    return {
      title,
      duration,
      artist: author,
      img
    };
  };

  const getSoundCloudInfo = player => {
    return new Promise(resolve => {
      player.getCurrentSound(songData => {
        if (songData) {
          resolve({
            duration: Number(songData.duration / 1000),
            title: songData.title,
            artist: songData.user.username,
            img: songData.artwork_url.replace("-large", "-t500x500")
          });
        }
      });
    });
  };

  const handleSongChange = e => {
    const { name, value } = e.target;
    setSong(prevSong => ({
      ...prevSong,
      [name]: value
    }));
  };

  const handleError = field => {
    return error && error.graphQLErrors[0].extensions.path.includes(field);
  };

  return (
    <div className={classes.container}>
      <Dialog
        className={classes.dialog}
        open={dialog}
        onClose={handleCloseDialog}
      >
        <DialogTitle>Edit Song</DialogTitle>
        <DialogContent>
          <img className={classes.image} src={song.img} alt="music" />
          <TextField
            onChange={handleSongChange}
            value={song.title}
            margin="dense"
            name="title"
            label="Title"
            fullWidth
            error={handleError("title")}
            helperText={handleError("title") && "Fill this field"}
          />
          <TextField
            onChange={handleSongChange}
            value={song.artist}
            margin="dense"
            name="artist"
            label="Artist"
            fullWidth
            error={handleError("artist")}
            helperText={handleError("artist") && "Fill this field"}
          />
          <TextField
            onChange={handleSongChange}
            value={song.url}
            margin="dense"
            name="url"
            label="Url"
            fullWidth
            error={handleError("url")}
            helperText={handleError("url") && "Fill this field"}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="secondary">
            Cancel
          </Button>
          <Button
            className={classes.saveButton}
            variant="outlined"
            color="secondary"
            onClick={handleAddSong}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>

      <TextField
        className={classes.urlInput}
        style={{ color: "white" }}
        onChange={e => setUrl(e.target.value)}
        value={url}
        placeholder="Add Youtube or SoundCloud URL"
        fullWidth
        margin="normal"
        type="url"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <LinkTwoToneIcon />
            </InputAdornment>
          )
        }}
      />
      <Button
        //disabled={!playable}
        className={classes.addSongButton}
        onClick={() => setDialog(true)}
        variant="contained"
        color="secondary"
        endIcon={<AddBoxOutlined />}
      >
        Add
      </Button>
      <ReactPlayer url={url} hidden={true} onReady={handleEditSong} />
    </div>
  );
}

export default AddSong;
