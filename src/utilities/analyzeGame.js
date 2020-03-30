const config = require("../config/config");
const { compareDamage } = require("./comparedamage");
const { compareGold } = require("./compareGold");
const { compareKda } = require("./compareKda");
const { teamDefs } = require("./enumClass");
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

const analyzeGame = (data, iteration, name, matchArray) => {
  let particpantId;
  let counter = 1;
  const singleGamePlayers = data.data.participantIdentities;
  for (var j = 0; j < singleGamePlayers.length; j++) {
    if (singleGamePlayers[j].player.accountId === name) {
      particpantId = counter;
    }
    counter++;
  }

  //participant id is the number 1-10 that the summoner is assigned that game

  let playerRole, team;

  //--------At this point I have gotten to the single persons single game and am grabbing as many stats as I can, I have identified the role of the player to compare to the opponenet in the loop below. all functions are passed here for friendly stats

  for (var k = 0; k < data.data.participants.length; k++) {
    if (data.data.participants[k].participantId == particpantId) {
      const userSummoner = data.data.participants[k];
      playerRole = userSummoner.timeline.lane;

      compareKda(userSummoner, teamDefs.team, iteration);

      compareDamage(
        userSummoner.stats.totalDamageDealtToChampions,
        teamDefs.team,
        iteration
      );
      compareGold(userSummoner, teamDefs.team, iteration);
    }
  }
  let secondCounter = 1;
  let returnKDA;
  //---------Loop to find opponent who has same lane assignment, follows all same logic. All sum functions or other stat derived functions are passed in here for opponent data
  for (var t = 0; t < data.data.participants.length; t++) {
    const enemySummoner = data.data.participants[t];

    if (
      enemySummoner.timeline.lane === playerRole &&
      secondCounter !== particpantId &&
      enemySummoner.teamId !== team &&
      enemySummoner.timeline.lane != "NONE"
    ) {
      compareKda(enemySummoner, teamDefs.enemyTeam, iteration);
      compareDamage(
        enemySummoner.stats.totalDamageDealtToChampions,
        teamDefs.enemyTeam,
        iteration
      );
      compareGold(enemySummoner, teamDefs.enemyTeam, iteration);
    }
    secondCounter++;
  }

  console.log("completed loop" + iteration);

  iteration++;

  findGame(matchArray, name, iteration);
};

module.exports = { analyzeGame, findGame };