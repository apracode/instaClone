import React from "react";
import Post from "./Post";

function PostList({ posts, user }) {
  return (
    posts &&
    posts.map((item, index) => <Post id={item.id} user={user} item={item} />)
  );
}

export default PostList;
