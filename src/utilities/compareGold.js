const displayO = {}
const config = require("../config/config")
let win = 0
let lose = 0
let oneTime = false
let secondOne = false

const compareGold = (stats, team, iteration) => {
  const gold = stats.stats.goldEarned
  if (team) {
    displayO[iteration] = {}
    displayO[iteration].teamGold = gold
  } else {
    displayO[iteration].enemyGold = gold
    displayO[iteration].goldDiff =
      Number(displayO[iteration].teamGold) -
      Number(displayO[iteration].enemyGold)
  }
  if (iteration === config.rateLimit) {
    const keysA = Object.keys(displayO)
    if (!oneTime) {
      oneTime = true
      for (var i = 0; i < keysA.length; i++) {
        if (displayO[keysA[i]].goldDiff) {
          if (displayO[keysA[i]].goldDiff > 0) {
            win++
            displayO[keysA[i]].win = win
            displayO[keysA[i]].lose = lose
          } else {
            lose++
            displayO[keysA[i]].win = win
            displayO[keysA[i]].lose = lose
          }
        } else {
          displayO[keysA[i]].win = win
          displayO[keysA[i]].lose = lose
        }
      }
    }

    let avgGold = 0,
      enemyAvgGold = 0,
      avgDiff = 0
    let goldCount = 0
    let enemycount = 0
    for (var t = 0; t < keysA.length; t++) {
      if (displayO[keysA[t]].goldDiff !== undefined) {
        avgDiff += Number(displayO[keysA[t]].goldDiff)
        goldCount++
      }
      if (displayO[keysA[t]].enemyGold) {
        enemyAvgGold += Number(displayO[keysA[t]].enemyGold)
        enemycount++
      }
      avgGold += Number(displayO[keysA[t]].teamGold)
    }
    displayO["final"] = {}
    displayO["final"].teamGold = (Number(avgGold) / config.rateLimit).toFixed(2)
    displayO["final"].enemyGold = (Number(enemyAvgGold) / enemycount).toFixed(2)
    displayO["final"].goldDiff = (Number(avgDiff) / goldCount).toFixed(2)
    displayO["final"].win = win
    displayO["final"].lose = lose
    const delay = ms => {
      setTimeout(() => {
        console.log("--------------- GOLD TABLE --------------------------")
        console.table(displayO)
      }, ms)
    }
    if (!secondOne) {
      delay(1500)
      secondOne = true
    }
  }
}

module.exports = { compareGold }
