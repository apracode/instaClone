import React from "react";
import { useGridPostStyles } from "../../styles";
import { Typography } from "@material-ui/core";
import { Link, useHistory } from "react-router-dom";

function GridPost({ post }) {
  const classes = useGridPostStyles();
  const history = useHistory();

  function handleOpenPostModal() {
    history.push({
      pathname: `/p/${post.id}`,
      state: { modal: true }
    });
  }

  return (
    <div onClick={handleOpenPostModal} className={classes.gridPostContainer}>
      <div className={classes.gridPostOverlay}>
        <div className={classes.gridPostInfo}>
          <span className={classes.likes} />
          <Typography>{post.likes}</Typography>
        </div>
        <div className={classes.gridPostInfo}>
          <span className={classes.comments} />
          <Typography>{post.comments.length}</Typography>
        </div>
      </div>
      <img src={post.media} alt="Post media" className={classes.image} />
    </div>
  );
}

export default GridPost;
