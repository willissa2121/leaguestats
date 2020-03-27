const config = require("../config/config");
const { teamDefs } = require("./enumClass");
const { sumFunc } = require("./sumFunc");

let kda, win, team, calcKDA;
let wonOpp = 0;
let lostOpp = 0;
let enemyKda, enemyWin, enemyCalcKDA;
const bigO = {};

const compareKda = (userSummoner, team, i) => {
  if (team) {
    playerRole = userSummoner.timeline.lane;
    kda = `${userSummoner.stats.kills}/${userSummoner.stats.deaths}/${userSummoner.stats.assists}`;
    win = userSummoner.stats.win;
    team = userSummoner.teamId;
    calcKDA =
      (userSummoner.stats.kills + userSummoner.stats.assists) /
      userSummoner.stats.deaths;
  } else {
    enemyKda = `${userSummoner.stats.kills}/${userSummoner.stats.deaths}/${userSummoner.stats.assists}`;
    enemyWin = userSummoner.stats.win;
    enemyCalcKDA =
      (userSummoner.stats.kills + userSummoner.stats.assists) /
      userSummoner.stats.deaths;
  }

  bigO[i] = {
    kda,
    calcKDA,
    enemyKda,
    enemyCalcKDA
  };
  if (i === config.rateLimit && team === teamDefs.enemyTeam) {
    const arrayOfKeys = Object.keys(bigO);
    for (var q = 0; q < arrayOfKeys.length; q++) {
      const dataIteration = bigO[arrayOfKeys[q]];
      if (dataIteration.calcKDA > dataIteration.enemyCalcKDA) {
        wonOpp++;
      } else if (dataIteration.enemyCalcKDA > dataIteration.calcKDA) {
        lostOpp++;
      }
      dataIteration.winOpp = wonOpp;
      dataIteration.loseOpp = lostOpp;
    }
    return sumFunc(bigO);
  }
};

module.exports = { compareKda };
