import { useCommentsContext } from "../hooks/useCommentsContext";
import { useAuthContext } from "../hooks/useAuthContext";

//date fns
import formatDistanceToNow from "date-fns/formatDistanceToNow";

const CommentDetails = ({ comment }) => {
  const { action } = useCommentsContext();
  const { user } = useAuthContext();

  const handleClick = async () => {
    if (!user) {
      return;
    }

    const response = await fetch("/api/comments/" + comment._id, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
    const json = await response.json();

    if (response) {
      action({ type: "DELETE_COMMENT", payload: json });
    }
  };

  return (
    <div className="post-details">
      <pre>{comment.body}</pre>
      <p>
        {formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true })}
      </p>
      <span className="material-symbols-outlined" onClick={handleClick}>
        delete
      </span>
    </div>
  );
};

export default CommentDetails;
