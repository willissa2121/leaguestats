const config = require("../config/config");
class PlayerData {
  constructor(props) {
    const { kda, calcKDA, enemyKDA, enemyCalcKDA, winOpp, loseOpp } = props;
    this.kda = kda;
    this.calcKDA = calcKDA;
    this.enemyKDA = enemyKDA;
    this.enemyCalcKDA = enemyCalcKDA;
    this.winOpp = winOpp;
    this.loseOpp = loseOpp;
  }
}

const sumFunc = bigO => {
  const keysA = Object.keys(bigO);
  let kills = (deaths = assists = enemyKills = enemyDeaths = enemyAssists = 0);
  let totalKDA = (averageCalc = totalEnemyKDA = averageEnemyCalc = totalWin = totalLoss = 0);
  for (var i = 0; i < keysA.length; i++) {
    kills += Number(bigO[keysA[i]].kda.split("/")[0]);
    deaths += Number(bigO[keysA[i]].kda.split("/")[1]);
    assists += Number(bigO[keysA[i]].kda.split("/")[2]);
    if (bigO[keysA[i]].enemyKDA !== undefined) {
      enemyKills += Number(bigO[keysA[i]].enemyKDA.split("/")[0]);
      enemyDeaths += Number(bigO[keysA[i]].enemyKDA.split("/")[1]);
      enemyAssists += Number(bigO[keysA[i]].enemyKDA.split("/")[2]);
    }
  }

  const finalKDA = `${(kills / config.rateLimit).toFixed(2)}/${(
    deaths / config.rateLimit
  ).toFixed(2)}/${(assists / config.rateLimit).toFixed(2)}`;

  const averageKDA = ((kills + assists) / deaths).toFixed(2);
  const finalEnemyKDA = `${(enemyKills / config.rateLimit).toFixed(2)}/${(
    enemyDeaths / config.rateLimit
  ).toFixed(2)}/${(enemyAssists / config.rateLimit).toFixed(2)}`;
  const averageEnemyKDA = (Number((enemyKills + enemyAssists)) / Number(enemyDeaths)).toFixed(
    2
  );
  bigO.final = {
    kda: finalKDA,
    calcKDA: averageKDA,
    enemyKda: finalEnemyKDA,
    enemyCalcKDA: averageEnemyKDA,
    wonOpp: bigO[keysA.length - 1].winOpp,
    lostOpp: bigO[keysA.length - 1].loseOpp
  };

  console.table(bigO);
  console.log("-----------------KDA COMPARISON--------------------");

  //return bigO;
};

module.exports = { PlayerData, sumFunc };
