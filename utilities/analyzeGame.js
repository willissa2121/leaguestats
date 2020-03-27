const config = require("../config/config");
const { compareDamage } = require("./comparedamage");
const { compareGold } = require("./compareGold");
const { compareKda } = require('./compareKda')
const axios = require('axios')


const findGame = async (matchArray, name, i) => {
  setTimeout(() => {
    if (i <= config.rateLimit) {
      axios
        .get(
          `https://na1.api.riotgames.com/lol/match/v4/matches/${matchArray[i].gameId}?api_key=${config.apiKey}`
        )
        .then(data => {
          analyzeGame(data, i, name, matchArray);
        }).catch(err => {
          throw err
        })
    }
  }, 100);
};

const analyzeGame = (data, i, name, matchArray) => {
  let particpantId;
  let counter = 1;
  for (var j = 0; j < data.data.participantIdentities.length; j++) {
    if (data.data.participantIdentities[j].player.accountId === name) {
      particpantId = counter;
    }
    counter++;
  }

  //participant id is the number 1-10 that the summoner is assigned that game

  let playerRole, kda, win, team, calcKDA


  //--------At this point I have gotten to the single persons single game and am grabbing as many stats as I can, I have identified the role of the player to compare to the opponenet in the loop below. all functions are passed here for friendly stats

  for (var k = 0; k < data.data.participants.length; k++) {
    if (data.data.participants[k].participantId == particpantId) {
      const userSummoner = data.data.participants[k];
      playerRole = userSummoner.timeline.lane;

      compareKda(userSummoner, 1, i);

      compareDamage(userSummoner.stats.totalDamageDealtToChampions, 1, i);
      compareGold(userSummoner, 1, i);

    }
  }
  let secondCounter = 1;
  //---------Loop to find opponent who has same lane assignment, follows all same logic. All sum functions or other stat derived functions are passed in here for opponent data
  for (var t = 0; t < data.data.participants.length; t++) {
    const enemySummoner = data.data.participants[t];

    if (
      enemySummoner.timeline.lane === playerRole &&
      secondCounter !== particpantId &&
      enemySummoner.teamId !== team &&
      enemySummoner.timeline.lane != "NONE"
    ) {
      compareKda(enemySummoner, 0, i);
      compareDamage(enemySummoner.stats.totalDamageDealtToChampions, 0, i);
      compareGold(enemySummoner, 0, i);
    }
    secondCounter++;
  }

  console.log("completed loop" + i);
  if (i == config.rateLimit) {
    console.log('beans')
    //return sumFunc(bigO);
  }
  i++;

  findGame(matchArray, name, i);
};

module.exports = { analyzeGame, findGame }