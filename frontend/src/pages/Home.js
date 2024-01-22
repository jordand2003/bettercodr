import { useEffect } from "react";
import { usePostsContext } from "../hooks/usePostsContexts";
import { useAuthContext } from "../hooks/useAuthContext";

//components
import PostDetails from "../components/PostDetails";
import PostForm from "../components/PostForm";
import CommentDetails from "../components/CommentDetails";
import { useCommentsContext } from "../hooks/useCommentsContext";

const Home = () => {
  const { posts, dispatch } = usePostsContext();
  const { comments, action } = useCommentsContext();
  const { user } = useAuthContext();

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch("/api/posts", {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      const json = await response.json();

      if (response.ok) {
        dispatch({ type: "SET_POSTS", payload: json });
      }
    };

    if (user) {
      fetchPosts();
    }
  }, [dispatch, user]);

  useEffect(() => {
    const fetchComments = async () => {
      const response = await fetch("/api/comments", {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      const json = await response.json();

      if (response.ok) {
        action({ type: "SET_COMMENTS", payload: json });
      }
    };

    if (user) {
      fetchComments();
    }
  }, [action, user]);

  return (
    <div className="home">
      <PostForm />
      <div className="posts">
        {posts &&
          posts.map((post) => <PostDetails key={post._id} post={post} />)}
      </div>
      <div className="posts">
        {comments &&
          comments.map((comment) => (
            <CommentDetails key={comment._id} comment={comment} />
          ))}
      </div>
    </div>
  );
};

export default Home;
