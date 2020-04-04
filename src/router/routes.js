const express = require("express");
const router = express.Router();
const config = require("../config/config");
const { matchHistory } = require("../utilities/analyzeGame.js");
const { aggregateStats } = require("../utilities/aggregateStats");

module.exports = {
  userSearch: router.post("/sendData", (req, res) => {
    const { value } = req.body;
    matchHistory(value);
    setTimeout(() => {
      console.log("penis");
      aggregateStats(value).then(data => {
        console.log(data);
        //res.json(data);
      });
    }, 500 * config.rateLimit);
  })
};
