require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const postRoutes = require("./routes/posts");
const userRoutes = require("./routes/user");
const commentsRoutes = require("./routes/comments");

//express app
const app = express();

//middleware
app.use(express.json());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

//routes
app.use("/api/posts", postRoutes);
app.use("/api/user", userRoutes);
app.use("/api/comments", commentsRoutes);

//connect to mongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    //listen for requests
    app.listen(process.env.PORT, () => {
      console.log("connected to DB and listening on port ", process.env.PORT);
    });
  })
  .catch((error) => {
    console.log(error);
  });
