const express = require("express");
const router = express.Router();
const { matchHistory } = require("../utilities/findData");
const models = require('../models')
const config = require("../config/config");

module.exports = {
  userSearch: router.post("/sendData", async (req, res) => {
    console.log(req.body);
    matchHistory(req.body.value);
    models.User.create({firstName:'tits', lastName:"mcgee"})
    
  })
};
