import { CommentsContext } from "../context/commentContext";
import { useContext } from "react";

export const useCommentsContext = () => {
  const context = useContext(CommentsContext);

  if (!context) {
    throw Error(
      "useCommentsContext must be used inside an CommentsContextProvider"
    );
  }

  return context;
};
