import { usePostsContext } from "../hooks/usePostsContexts";
import { useAuthContext } from "../hooks/useAuthContext";
import { Link } from "react-router-dom";

//date fns
import formatDistanceToNow from "date-fns/formatDistanceToNow";

const PostDetails = ({ post }) => {
  const { dispatch } = usePostsContext();
  const { user } = useAuthContext();

  const handleClick = async () => {
    if (!user) {
      return;
    }

    const response = await fetch("/api/posts/" + post._id, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
    const json = await response.json();

    if (response) {
      dispatch({ type: "DELETE_POST", payload: json });
    }
  };

  return (
    <div className="post-details">
      <Link to={post._id}>
        <h4>{post.title}</h4>
      </Link>
      <pre>{post.body}</pre>
      <p>
        {formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}
      </p>
      <span className="material-symbols-outlined" onClick={handleClick}>
        delete
      </span>
    </div>
  );
};

export default PostDetails;
