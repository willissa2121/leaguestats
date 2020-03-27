const config = require("../config/config");
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

  if (calcKDA > enemyCalcKDA && enemyCalcKDA !== undefined) {
    wonOpp++;
  } else if (enemyCalcKDA !== undefined && calcKDA < enemyCalcKDA) {
    lostOpp++;
  }

  bigO[i] = {
    kda,
    calcKDA,
    enemyKda,
    enemyCalcKDA,
    wonOpp,
    lostOpp
  };
  if (i === config.rateLimit) {
   
   sumFunc(bigO)
  }
};

module.exports = { compareKda };
