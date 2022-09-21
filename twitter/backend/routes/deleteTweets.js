/* 
 This file has delete functionality to remove the tweet from twitter account
 Callback method is added to authorize a user with its twitter account
 @param tweetID
 output boolean true if tweet deleted otherwise return false if tweet does not delete.
*/
const express = require("express");
const { Client, auth } = require("twitter-api-sdk");
const dotenv = require("dotenv");
dotenv.config();

const app = express();

const authClient = new auth.OAuth2User({
  client_id: process.env.CLIENT_ID,
  client_secret: process.env.CLIENT_SECRET,
  callback: `${process.env.URL}:${process.env.PORT}/callback`,
  scopes: ["users.read", "tweet.read", "tweet.write"],
});
const client = new Client(authClient);
const STATE = "my-state";
const router = require("express").Router();

//delete tweet - Added by Piyush
router.get("/", async (req, res) => {
  const authUrl = authClient.generateAuthURL({
    state: STATE,
    code_challenge_method: "s256",
  });
  console.log(authUrl);
  res.redirect(authUrl);

  app.get("/callback", async function (req, res) {
    try {
      const { code, state } = req.query;
      if (state !== STATE) return res.status(500).send("State isn't matching");
      await authClient.requestAccessToken(code);
      res.redirect("/deleteTweet");
    } catch (error) {
      console.log(error);
    }
  });

  app.get("/revoke", async function (req, res) {
    try {
      const response = await authClient.revokeAccessToken();
      res.send(response);
    } catch (error) {
      console.log(error);
    }
  });

  app.get("/deleteTweet", async function (req, res) {
    try {
      const response = await client.tweets.deleteTweetById(req.headers.id);

      console.log("response", JSON.stringify(response, null, 2));
      res.send(response);
    } catch (error) {
      console.log("tweets error", error);
    }
  });
});

module.exports = router;
