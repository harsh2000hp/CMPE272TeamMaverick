/* 
 This file has get functionality to post a tweet and show on UI as well as twitter account
 @param text
 output posted tweets
*/
const express = require("express");
const { Client, auth } = require("twitter-api-sdk");
const dotenv = require("dotenv");
dotenv.config();

const app = express();
const router = require("express").Router();

const authClient = new auth.OAuth2User({
  client_id: process.env.CLIENT_ID,
  client_secret: process.env.CLIENT_SECRET,
  callback: `${process.env.URL}:${process.env.PORT}/callback`,
  scopes: ["users.read", "tweet.read", "tweet.write"],
});
const client = new Client(authClient);
const STATE = "my-state";

//post tweet - Added by PhaniSaiRam
router.get("/", async (req, res) => {
  const authUrl = authClient.generateAuthURL({
    state: STATE,
    code_challenge_method: "s256",
  });
  console.log("here1" + authUrl);
  res.redirect(authUrl);

  app.get("/callback", async function (req, res) {
    try {
      const { code, state } = req.query;
      if (state !== STATE) return res.status(500).send("State isn't matching");
      await authClient.requestAccessToken(code);
      res.redirect("/tweets");
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

  app.get("/tweets", async function (req, res) {
    try {
      const response = await client.tweets.createTweet({
        text:
          "good morning twitter tommrow is sat.. " +
          Math.floor(Math.random() * 100),
      });

      console.log("response", JSON.stringify(response, null, 2));
      res.send(response);
    } catch (error) {
      console.log("tweets error", error);
    }
  });
});

module.exports = router;
