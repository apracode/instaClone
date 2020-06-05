import React, { useState } from "react";
import { useFeedPageStyles } from "../styles";
import Layout from "../components/shared/Layout";
import LoadingScreen from "../components/shared/LoadingScreen";

import { defaultPost, getDefaultPost } from "../data";
import FeedPost from "../components/feed/FeedPost";
import FeedSideSuggestions from "../components/feed/FeedSideSuggestions";

import { Hidden } from "@material-ui/core";
import UserCard from "../components/shared/UserCard";
import { LoadingLargeIcon } from "../icons";

function FeedPage() {
  const classes = useFeedPageStyles();
  const loading = false;
  const [isEndOfFeed, setIsEndOfFeed] = useState(false);

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <Layout>
      <div className={classes.container}>
        <div>
          {Array.from({ length: 5 }, () => getDefaultPost()).map((post, index) => {
            return <FeedPost key={post.id} index={index} post={post} />;
          })}
        </div>
        {/* Sidebar */}
        <Hidden smDowm>
          <div className={classes.sidebarContainer}>
            <div className={classes.sidebarWrapper}>
              <UserCard avatarSize={50} />
              <FeedSideSuggestions />
            </div>
          </div>
        </Hidden>
        {!isEndOfFeed && <LoadingLargeIcon />}
      </div>
    </Layout>
  );
}

export default FeedPage;
