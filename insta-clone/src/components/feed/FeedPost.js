import React, { useState, useRef } from "react";
import { useFeedPostStyles } from "../../styles";
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
import HTMLEllipsis from "react-lines-ellipsis/lib/html";

function FeedPost({ post, index }) {
  const classes = useFeedPostStyles();
  const { id, media, likes, user, caption, comments } = post;
  const [showCaption, setCaption] = useState(false);
  const [showOptionsDialog, setShowOptionsDialog] = useState(false);
  const showFollowSuggestions = index === 1;

  return (
    <>
      <article
        className={classes.article}
        style={{ marginBottom: showFollowSuggestions && 30 }}
      >
        <div className={classes.postHeader}>
          <UserCard user={post.user} />
          <MoreIcon
            className={classes.moreIcon}
            onClick={() => setShowOptionsDialog(true)}
          />
        </div>
        <div>
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
          <div className={showCaption ? classes.expanded : classes.collapsed}>
            <Link to={`/${user.username}`}>
              <Typography
                variant="subtitle2"
                component="span"
                className={classes.username}
              >
                {user.username}
              </Typography>
            </Link>
            {showCaption ? (
              <Typography
                variant="body2"
                component="span"
                dangerouslySetInnerHTML={{ __html: caption }}
              />
            ) : (
              <div className={classes.captionWrapper}>
                <HTMLEllipsis
                  unsafeHTML={caption}
                  className={classes.caption}
                  maxLine="0"
                  ellipsis="..."
                  baseOn="letters"
                />
                <Button
                  className={classes.moreButton}
                  onClick={() => setCaption(true)}
                >
                  more
                </Button>
              </div>
            )}
          </div>
          <Link to={`p/${id}`}>
            <Typography
              className={classes.commentsLink}
              variant="body2"
              component="div"
            >
              View all {`${comments.length} comments`}
            </Typography>
          </Link>
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
          <Typography color="textSecondary" className={classes.datePosted}>
            5 DAYS AGO
          </Typography>
        </div>
        <Hidden xsDown>
          <Divider />
          <Comment />
          <Divider />
        </Hidden>
      </article>
      {showFollowSuggestions && <FollowSuggestions />}
      {showOptionsDialog && (
        <OptionsDialog onClose={() => setShowOptionsDialog(false)} />
      )}
    </>
  );
}

function LikeButton() {
  const classes = useFeedPostStyles();
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
  const classes = useFeedPostStyles();
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
  const classes = useFeedPostStyles();
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

export default FeedPost;
