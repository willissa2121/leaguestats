const config = require("../config/config");

// let displayO = { team: {}, enemy: {}, sum: {}, win: {}, lose: {} }
let displayO = {};
let winCount = 0;
let loseCount = 0;

const compareDamage = (damage, team, iterator) => {
  if (team) {
    displayO[iterator] = {};
    displayO[iterator].teamDamage = damage;
  } else {
    displayO[iterator].enemyDamage = damage;
  }

  if (iterator === config.rateLimit + 1 && team) {
    const keysA = Object.keys(displayO);
    for (var i = 0; i < keysA.length; i++) {
      if (
        displayO[keysA[i]].teamDamage === undefined ||
        displayO[keysA[i]].enemyDamage === undefined
      ) {
        displayO[keysA[i]].sum = "No Data";
      } else {
        const sumVal =
          Number(displayO[keysA[i]].teamDamage) -
          Number(displayO[keysA[i]].enemyDamage);
        if (sumVal) {
          displayO[keysA[i]].sum = sumVal;
          if (sumVal > 0) {
            winCount++;
            displayO[keysA[i]].win = winCount;
            displayO[keysA[i]].lose = loseCount;
          } else {
            loseCount++;
            displayO[keysA[i]].win = winCount;
            displayO[keysA[i]].lose = loseCount;
          }
        } else {
          if (i !== 0) {
            displayO[keysA[i]].sum = "no data";
            displayO[keysA[i]].lose[i] = loseCount;
            displayO[keysA[i]].win[i] = winCount;
          }
        }
      }
    }
    const keysB = Object.keys(displayO);
    let avgDamage = 0;
    let enemyAvgDamage = 0;
    let avgDiff = 0;
    for (var t = 0; t < keysB.length; t++) {
      avgDamage += Number(displayO[keysB[t]].teamDamage);
      enemyAvgDamage += Number(displayO[keysB[t]].enemyDamage);
      avgDiff += Number(displayO[keysB[t]].sum);
    }
    displayO.final = {
      teamDamage: (avgDamage / config.rateLimit).toFixed(2),
      enemyDamage: (enemyAvgDamage / config.rateLimit).toFixed(2),
      sum: (avgDiff / config.rateLimit).toFixed(2),
      win: winCount,
      lose: loseCount
    };
    
    const delay = ms => {
      setTimeout(() => {
        console.log("-----------------DAMAGE COMPARISON--------------------");
        console.table(displayO);
      }, ms);
    };
    delay(3000);
  }
};

module.exports = { compareDamage };
