import React from "react";
import { useFollowSuggestionsStyles } from "../../styles";
import { Typography, Avatar } from "@material-ui/core";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { LoadingLargeIcon } from "../../icons";
import { getDefaultUser } from "../../data";
import { Link } from "react-router-dom";
import FollowButton from "./FollowButton";

function FollowSuggestions({ hideHeader }) {
  const classes = useFollowSuggestionsStyles();

  const loading = false;

  return (
    <div className={classes.container}>
      {hideHeader ? null : (
        <Typography
          color="textSecondary"
          variant="subtitle2"
          className={classes.typography}
        >
          Suggestions For You
        </Typography>
      )}

      {loading ? (
        <LoadingLargeIcon />
      ) : (
        <Slider
          className={classes.slide}
          dots={false}
          infinite
          speed={1000}
          touchThreshold={1000}
          variableWidth
          swipeToSlide
          arrows
          slidesToScroll={3}
          easing="ease-in-out"
        >
          {Array.from({ length: 10 }, () => getDefaultUser()).map(user => {
            return <FollowSuggestionsItem key={user.id} user={user} />;
          })}
        </Slider>
      )}
    </div>
  );
}

function FollowSuggestionsItem({ user }) {
  const classes = useFollowSuggestionsStyles();

  return (
    <div>
      <div className={classes.card}>
        <Link to={`/${user.username}`}>
          <Avatar
            src={user.profile_image}
            alt="User avatar"
            classes={{
              root: classes.avatar,
              img: classes.avatarImg
            }}
          />
        </Link>
        <Link to={`/${user.username}`}>
          <Typography
            variant="subtitle2"
            align="center"
            className={classes.text}
          >
            {user.username}
          </Typography>
        </Link>
        <Typography
          color="textSecondary"
          variant="body2"
          className={classes.text}
          align="center"
        >
          {user.name}
        </Typography>
        <FollowButton side="false" />
      </div>
    </div>
  );
}

export default FollowSuggestions;
