/* 
 This file has get and search functionality to fetch all the tweet of a user from twitter account
 First we need to pass the username in our case it's maveric1303 to get all tweets.
 @param username
 output list of tweets
*/
const { TwitterApi } = require("twitter-api-v2");
const twitterClient = new TwitterApi(process.env.BEARER_TOKEN);
const router = require("express").Router();
const { Client, auth } = require("twitter-api-sdk");

const URL = process.env.URL || "localhost";
const PORT = process.env.PORT || 5000;
const authClient = new auth.OAuth2User({
  client_id: process.env.CLIENT_ID,
  client_secret: process.env.CLIENT_SECRET,
  callback: `${URL}:${PORT}/callback`,
  scopes: ["users.read", "tweet.read", "tweet.write"],
});
const client = new Client(authClient);
const STATE = "my-state";

//Retrieve Tweets - Added by Priya Gupta
router.get("/search", async (req, r) => {
  const client = new Client(process.env.BEARER_TOKEN);
  const res = await twitterClient.v2.userByUsername("maveric1303");
  var id = res.data.id;
  const response = await client.tweets.usersIdTweets(id);
  console.log(response);
  r.send(response);
  return response;
});

router.get("/", async (req, res) => {
  const authUrl = authClient.generateAuthURL({
    state: STATE,
    code_challenge_method: "s256",
  });
  console.log(authUrl);
  res.redirect(authUrl);

  router.get("/callback", async function (req, res) {
    try {
      const { code, state } = req.query;
      if (state !== STATE) return res.status(500).send("State isn't matching");
      await authClient.requestAccessToken(code);
      res.redirect("/delete");
    } catch (error) {
      console.log(error);
    }
  });

  router.get("/revoke", async function (req, res) {
    try {
      const response = await authClient.revokeAccessToken();
      res.send(response);
    } catch (error) {
      console.log(error);
    }
  });
});

module.exports = router;
