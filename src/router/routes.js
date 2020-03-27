const express = require("express");
const router = express.Router();
const { matchHistory } = require("../utilities/findData");
const config = require("../config/config");

module.exports = {
  userSearch: router.post("/sendData", async (req, res) => {
    console.log(req.body);
    matchHistory(config.scottId);
  })
};
