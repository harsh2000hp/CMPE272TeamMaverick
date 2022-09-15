var express = require("express");
var router = express.Router();
const config = require("./../config");
var Twit = require("twit");

var T = new Twit(config);
//search api - Added by Pankaj

router.get("/search", function (req, res, next) {
  //res.send('respond with a resource');
  console.log(req.headers);
  T.get("search/tweets", { q: req.headers.query, count: 10 })
    .then((results) => res.json(results))
    .catch((err) => res.status(400).json("Error: " + err));
});

//create tweet - Added by Manish
router.get("/tweet", function (req, res, next) {
  //res.send('respond with a resource');
  T.post("statuses/update", { status: req.headers.text })
    .then((results) => res.json(results))
    .catch((err) => res.status(400).json("Error: " + err));

  alert("Tweeted");
});

//delete api - Added by Bharat
router.get("/delete", function (req, res, next) {
  console.log(req.headers);
  T.post("statuses/destroy/:id", { id: req.headers.id })
    .then((results) => res.json(results))
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
