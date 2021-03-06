import React from "react";
import { useFeedSideSuggestionsStyles } from "../../styles";
import { Paper, Typography } from "@material-ui/core";
import { getDefaultUser } from "../../data";
import UserCard from "../shared/UserCard";
import FollowButton from "../shared/FollowButton";
import { LoadingIcon } from "../../icons";

function FeedSideSuggestions() {
  const classes = useFeedSideSuggestionsStyles();

  const loading = false;

  return (
    <article className={classes.article}>
      <Paper className={classes.paper}>
        <Typography
          color="textSecondary"
          variant="subtitle2"
          component="h2"
          align="left"
          gutterBottom
          className={classes.typography}
        >
          Suggestions For You
        </Typography>
        {loading ? (
          <LoadingIcon />
        ) : (
          Array.from({ length: 5 }, () => getDefaultUser()).map(user => {
            return (
              <div className={classes.card} key={user.id}>
                <UserCard user={user} />
                <FollowButton side />
              </div>
            );
          })
        )}
      </Paper>
    </article>
  );
}

export default FeedSideSuggestions;
