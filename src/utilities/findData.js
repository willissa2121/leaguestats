const axios = require('axios');
const config = require('../config/config');

const { findGame } = require('./analyzeGame');

const matchHistory = async (id) => {
  axios
    .get(
      `https://na1.api.riotgames.com/lol/match/v4/matchlists/by-account/${id}?api_key=${config.apiKey}`,
    )
    .then((data) => {
      findGame(data.data.matches, id, 0);
    })
    .catch((err) => {
      throw err;
    });
};

module.exports = { matchHistory, findGame };
