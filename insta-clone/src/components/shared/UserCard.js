import React from "react";
import { useUserCardStyles } from "../../styles";
import { Link } from "react-router-dom";
import { Typography, Avatar } from "@material-ui/core";
import { defaultUser } from "../../data";

function UserCard({ user = defaultUser, avatarSize = 44 }) {
  const classes = useUserCardStyles({avatarSize});

  return (
    <div className={classes.wrapper}>
      <Link to={`/${user.username}`}>
        <Avatar
          src={user.profile_image}
          alt="User avatar"
          className={classes.avatar}
        />
      </Link>
      <div className={classes.nameWrapper}>
        <Link to={`/${user.username}`}>
          <Typography variant="subtitle2" className={classes.typography}>
            {user.username}
          </Typography>
        </Link>
        <Typography
          color="textSecondary"
          variant="body2"
          className={classes.typography}
        >
          {user.name}
        </Typography>
      </div>
    </div>
  );
}

export default UserCard;
