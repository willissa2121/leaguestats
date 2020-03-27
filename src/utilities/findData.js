const config = require("../config/config");
const { compareDamage } = require("./comparedamage");
const { compareGold } = require("./compareGold");
const axios = require("axios");
const { compareKda } = require("./compareKda");
const { findGame } = require("./analyzeGame");
const matchHistory = async id => {
  axios
    .get(
      `https://na1.api.riotgames.com/lol/match/v4/matchlists/by-account/${id}?api_key=${config.apiKey}`
    )
    .then(data => {
      findGame(data.data.matches, id, 0)
    })
    .catch(err => {
      rej(err);
    });
};

module.exports = { matchHistory };
