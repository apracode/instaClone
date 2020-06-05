import React, { useState, useRef } from "react";
import { usePostStyles } from "../../styles";
import UserCard from "../shared/UserCard";
import FollowSuggestions from "../shared/FollowSuggestions";
import OptionsDialog from "../shared/OptionsDialog";

import {
  MoreIcon,
  ShareIcon,
  CommentIcon,
  UnlikeIcon,
  LikeIcon,
  RemoveIcon,
  SaveIcon
} from "../../icons";
import { Link } from "react-router-dom";
import {
  Typography,
  Button,
  Hidden,
  Divider,
  TextField
} from "@material-ui/core";
import { defaultPost } from "../../data";

function Post() {
  const classes = usePostStyles();
  const { id, media, likes, user, caption, comments } = defaultPost;
  const [showOptionsDialog, setShowOptionsDialog] = useState(false);

  return (
    <div className={classes.postContainer}>
      <article className={classes.article}>
        <div className={classes.postHeader}>
          <UserCard user={user} avatarSize={32} />
          <MoreIcon
            className={classes.moreIcon}
            onClick={() => setShowOptionsDialog(true)}
          />
        </div>
        <div className={classes.postImage}>
          <img src={media} alt="Post media" className={classes.image} />
        </div>
        <div className={classes.postButtonsWrapper}>
          <div className={classes.postButtons}>
            <LikeButton />
            <Link to={`/p/${id}`}>
              <CommentIcon />
            </Link>
            <ShareIcon />
            <SaveButton />
          </div>
          <Typography className={classes.likes} variant="subtitle2">
            <span>{likes === 1 ? "1 like" : `${likes} likes`}</span>
          </Typography>
          <div className={classes.postCaptionContainer}>
            <Typography
              variant="body2"
              component="span"
              className={classes.postCaption}
              dangerouslySetInnerHTML={{ __html: caption }}
            />

            {comments.map(comment => {
              return (
                <div key={comment.id}>
                  <Link to={`/${comment.user.username}`}>
                    <Typography
                      variant="subtitle2"
                      component="span"
                      className={classes.commentUsername}
                    >
                      {comment.user.username}
                    </Typography>{" "}
                    <Typography variant="body2" component="span">
                      {comment.content}
                    </Typography>
                  </Link>
                </div>
              );
            })}
          </div>
          <Typography color="textSecondary" className={classes.datePosted}>
            5 DAYS AGO
          </Typography>
          <Hidden xsDown>
            <div className={classes.comment}>
              <Divider />
              <Comment />
            </div>
          </Hidden>
        </div>
      </article>
      {showOptionsDialog && (
        <OptionsDialog onClose={() => setShowOptionsDialog(false)} />
      )}
    </div>
  );
}

function LikeButton() {
  const classes = usePostStyles();
  const [liked, setLiked] = useState(false);
  const Icon = liked ? UnlikeIcon : LikeIcon;
  const className = liked ? classes.liked : classes.like;
  const onClick = liked ? handleLike : handleUnlike;

  function handleUnlike() {
    setLiked(true);
  }
  function handleLike() {
    setLiked(false);
  }

  return <Icon onClick={onClick} className={className} />;
}

function SaveButton() {
  const classes = usePostStyles();
  const [saved, setSaved] = useState(false);
  const Icon = saved ? RemoveIcon : SaveIcon;
  const onClick = saved ? handleSave : handleUnSave;

  function handleUnSave() {
    setSaved(true);
  }
  function handleSave() {
    setSaved(false);
  }

  return <Icon className={classes.saveIcon} onClick={onClick} />;
}

function Comment() {
  const classes = usePostStyles();
  const [content, setContent] = useState("");

  return (
    <div className={classes.commentContainer}>
      <TextField
        fullWidth
        value={content}
        placeholder="Add a comment..."
        multiline
        rowsMax={2}
        rows={1}
        className={classes.textField}
        onChange={e => setContent(e.target.value)}
        InputProps={{
          classes: {
            root: classes.root,
            underline: classes.underline
          }
        }}
      />
      <Button
        color="primary"
        className={classes.commentButton}
        disabled={!content.trim()}
      >
        Post
      </Button>
    </div>
  );
}

export default Post;
