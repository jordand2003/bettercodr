import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { PostsContextProvider } from "./context/postContext";
import { AuthContextProvider } from "./context/AuthContext";
import { CommentsContextProvider } from "./context/commentContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <CommentsContextProvider>
        <PostsContextProvider>
          <App />
        </PostsContextProvider>
      </CommentsContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
