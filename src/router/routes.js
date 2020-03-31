const express = require("express");
const router = express.Router();
const { matchHistory } = require("../utilities/findData");

module.exports = {
  userSearch: router.post("/sendData", req => {
    matchHistory(req.body.value);
  })
};
