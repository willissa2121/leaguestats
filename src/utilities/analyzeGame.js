const config = require("../config/config");
const { storeStats } = require("./storeStats");

const axios = require("axios");

const findGame = async (matchArray, name, i) => {
  setTimeout(() => {
    if (i <= config.rateLimit) {
      axios
        .get(
          `https://na1.api.riotgames.com/lol/match/v4/matches/${matchArray[i].gameId}?api_key=${config.apiKey}`
        )
        .then(data => {
          analyzeGame(data, i, name, matchArray);
        })
        .catch(err => {
          throw err;
        });
    }
  }, 100);
};

const analyzeGame = (data, iteration, accountID, matchArray) => {
  const gameID = data.data.gameId;

  let particpantId;
  let counter = 1;
  const singleGamePlayers = data.data.participantIdentities;
  for (var j = 0; j < singleGamePlayers.length; j++) {
    if (singleGamePlayers[j].player.accountId === accountID) {
      particpantId = counter;
    }
    counter++;
  }

  for (var k = 0; k < data.data.participants.length; k++) {
    if (data.data.participants[k].participantId == particpantId) {
      const userSummoner = data.data.participants[k];
      const allSummoner = data.data.participants;

      storeStats(userSummoner, allSummoner, gameID, true, accountID);
    }
  }

  console.log("completed loop" + iteration);
  iteration++;

  findGame(matchArray, accountID, iteration);
};

module.exports = { findGame };
