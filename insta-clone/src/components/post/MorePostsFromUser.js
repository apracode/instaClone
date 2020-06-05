import React from "react";
import { useMorePostsFromUserStyles } from "../../styles";
import { Typography } from "@material-ui/core";
import { LoadingLargeIcon } from "../../icons";
import { defaultPost, defaultUser } from "../../data";
import GridPost from "../shared/GridPost";
import { Link, useParams } from "react-router-dom";

function MorePostsFromUser() {
  const classes = useMorePostsFromUserStyles();
  const loading = false;

  return (
    <div className={classes.container}>
      <Typography
        color="textSecondary"
        variant="subtitle2"
        component="h2"
        gutterBottom
        className={classes.typography}
      >
        More Posrt From{" "}
        <Link to={`${defaultUser.username}`} className={classes.link}>
          {`@${defaultUser.username}`}
        </Link>
      </Typography>
      {loading ? (
        <LoadingLargeIcon />
      ) : (
        <article className={classes.article}>
          <div className={classes.postContainer}>
            {Array.from({ length: 6 }, () => defaultPost).map(post => {
              return <GridPost key={post.id} post={post} />;
            })}
          </div>
        </article>
      )}
    </div>
  );
}

export default MorePostsFromUser;
