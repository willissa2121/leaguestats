const { compareDamage } = require("./comparedamage");
const { compareGold } = require("./compareGold");
const axios = require("axios");
const config = require("../config/config");
const { PlayerData, sumFunc } = require("./sumFunc");
let wonOpp = 0;
let lostOpp = 0;
let bigO = {};
const findGame = async (matchArray, name, i) => {
  setTimeout(() => {
    if (i < config.rateLimit + 1) {
      //   for (var i = 0; i < matchArray.length; i++) {
      axios
        .get(
          `https://na1.api.riotgames.com/lol/match/v4/matches/${matchArray[i].gameId}?api_key=${config.secret}`
        )
        .then(data => {
          let particpantId;
          let counter = 1;
          for (var j = 0; j < data.data.participantIdentities.length; j++) {
            if (data.data.participantIdentities[j].player.accountId === name) {
              particpantId = counter;
            }
            counter++;
          }
          let playerRole, kda, win, team, calcKDA;

          //--------At this point I have gotten to the single persons single game and am grabbing as many stats as I can, I have identified the role of the player to compare to the opponenet in the loop below. all functions are passed here for friendly stats
          for (var k = 0; k < data.data.participants.length; k++) {
            if (data.data.participants[k].participantId == particpantId) {
              compareDamage(
                data.data.participants[k].stats.totalDamageDealtToChampions,
                1,
                i
              );
              compareGold(data.data.participants[k], 1, i);

              playerRole = data.data.participants[k].timeline.lane;
              kda = `${data.data.participants[k].stats.kills}/${data.data.participants[k].stats.deaths}/${data.data.participants[k].stats.assists}`;
              win = data.data.participants[k].stats.win;
              team = data.data.participants[k].teamId;
              calcKDA =
                (data.data.participants[k].stats.kills +
                  data.data.participants[k].stats.assists) /
                data.data.participants[k].stats.deaths;
            }
          }
          let enemyKda, enemyWin, enemyCalcKDA;
          let secondCounter = 1;
          //---------Loop to find opponent who has same lane assignment, follows all same logic. All sum functions or other stat derived functions are passed in here for opponent data
          for (var t = 0; t < data.data.participants.length; t++) {
            if (
              data.data.participants[t].timeline.lane === playerRole &&
              secondCounter !== particpantId &&
              data.data.participants[t].teamId !== team &&
              data.data.participants[t].timeline.lane != "NONE"
            ) {
              compareDamage(
                data.data.participants[t].stats.totalDamageDealtToChampions,
                0,
                i
              );
              compareGold(data.data.participants[t], 0, i);
              enemyKda = `${data.data.participants[t].stats.kills}/${data.data.participants[t].stats.deaths}/${data.data.participants[t].stats.assists}`;
              enemyWin = data.data.participants[t].stats.win;
              enemyCalcKDA =
                (data.data.participants[t].stats.kills +
                  data.data.participants[t].stats.assists) /
                data.data.participants[t].stats.deaths;
            }
            secondCounter++;
          }

          if (calcKDA > enemyCalcKDA && enemyCalcKDA !== undefined) {
            wonOpp++;
          } else if (enemyCalcKDA !== undefined && calcKDA < enemyCalcKDA) {
            lostOpp++;
          }

          bigO[i] = new PlayerData(
            kda,
            calcKDA,
            enemyKda,
            enemyCalcKDA,
            wonOpp,
            lostOpp
          );
          console.log("completed loop" + i);
          if (i == config.rateLimit) {
            //function that does math on values and calls console.table()
            sumFunc(bigO);
          }
        });
      i++;
      findGame(matchArray, name, i);
    }
  }, 100);
};

module.exports = { findGame };
