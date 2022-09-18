//Created by - HarshPatel
var express = require("express");
var path = require("path");
var cors = require("cors");
const postTweet = require("./routes/postTweets");
const deleteTweet = require("./routes/deleteTweets");

var index = require("./routes/Routes");

var app = express();

var corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
  optionsSuccessStatus: 200,
};

app.use("/post", postTweet);
app.use("/delete", deleteTweet);

app.use(cors(corsOptions));
app.use("/", index);
app.listen(5000);
module.exports = app;
