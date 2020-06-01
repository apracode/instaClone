import React, { useState, useRef, useContext } from "react";

import { PostContext } from "../App";

function CreatePost({ user }) {
  const { dispatch } = useContext(PostContext);
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const imageRef = useRef();

  const handelSubmit = e => {
    e.preventDefault();
    const post = { description, image, user, id: Date.now() };
    dispatch({ type: "ADD_POST", payload: { post } });
    setDescription("");
    imageRef.current.value = "";
  };

  return (
    <div>
      <h2>Create New Post</h2>
      <form onSubmit={handelSubmit} action="">
        <input
          onChange={e => setDescription(e.target.value)}
          type="text"
          placeholder="Post Description"
          name=""
          id=""
          value={description}
        />
        <input
          onChange={e => setImage(e.target.files[0])}
          type="file"
          name=""
          id=""
          ref={imageRef}
        />
        <button type="submit">Post</button>
      </form>
    </div>
  );
}

export default CreatePost;
