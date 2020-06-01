import React, { useContext } from "react";
import styles from "../styles/Post.scss";
import { UserContext } from "../App";
import { PostContext } from "../App";

function Post({ index, item, user, id }) {
  const currentUser = useContext(UserContext);
  const isCurrentUser = currentUser === user;
  const { dispatch } = useContext(PostContext);

  const handleDelete = () => {
    dispatch({ type: "DELETE_POST", payload: { id } });
  };

  return (
    <>
      <React.Fragment key={id}>
        {item.image && (
          <img
            style={{ height: 200, width: 200, objectFit: "cover" }}
            src={URL.createObjectURL(item.image)}
            alt=""
          />
        )}
        <p>{item.description}</p>
        <p className={isCurrentUser && "username"}>{item.user}</p>
        <div>
          {" "}
          {isCurrentUser && <button onClick={handleDelete}>DELETE</button>}
        </div>
      </React.Fragment>
    </>
  );
}

export default Post;
