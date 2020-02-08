const { config } = require("../config/config")
const { compareDamage } = require("./comparedamage")
const { compareGold } = require("./compareGold")
const { PlayerData, sumFunc } = require("./sumFunc")
let winOpp = 0
let loseOpp = 0

const handleGames = (matches, SummonerName) => {
  const matchResults = matches.map((match, i) => {
    return handleGame(match, SummonerName, i);
  });
  
  return sumFunc(matchResults);
}

const handleGame = (match, SummonerName, i) => {
  let particpantId
  let counter = 1
  for (var j = 0; j < match.data.participantIdentities.length; j++) {
    let curName = String.toString(match.data.participantIdentities[j].player.summonerName).toLowerCase().split(' ').join('');
    let sumName = String.toString(SummonerName).toLowerCase().split(' ').join('');
    if (curName === sumName) {
      particpantId = counter
    }
    counter++
  }
  let playerRole, kda, win, team, calcKDA

  //--------At this point I have gotten to the single persons single game and am grabbing as many stats as I can, I have identified the role of the player to compare to the opponenet in the loop below. all functions are passed here for friendly stats
  for (var k = 0; k < match.data.participants.length; k++) {
    if (match.data.participants[k].participantId == particpantId) {
      compareDamage(
        match.data.participants[k].stats.totalDamageDealtToChampions,
        1,
        i
      )
      compareGold(match.data.participants[k], 1, i)

      playerRole = match.data.participants[k].timeline.lane
      kda = `${match.data.participants[k].stats.kills}/${match.data.participants[k].stats.deaths}/${match.data.participants[k].stats.assists}`
      win = match.data.participants[k].stats.win
      team = match.data.participants[k].teamId
      calcKDA =
        (match.data.participants[k].stats.kills +
          match.data.participants[k].stats.assists) /
          match.data.participants[k].stats.deaths
    }
  }
  let enemyKDA, enemyWin, enemyCalcKDA
  let secondCounter = 1
  //---------Loop to find opponent who has same lane assignment, follows all same logic. All sum functions or other stat derived functions are passed in here for opponent data
  for (var t = 0; t < match.data.participants.length; t++) {
    if (
      match.data.participants[t].timeline.lane === playerRole &&
      secondCounter !== particpantId &&
      match.data.participants[t].teamId !== team &&
      match.data.participants[t].timeline.lane != "NONE"
    ) {
      compareDamage(
        match.data.participants[t].stats.totalDamageDealtToChampions,
        0,
        i
      )
      compareGold(match.data.participants[t], 0, i)
      enemyKDA = `${match.data.participants[t].stats.kills}/${match.data.participants[t].stats.deaths}/${match.data.participants[t].stats.assists}`
      enemyWin = match.data.participants[t].stats.win
      enemyCalcKDA =
        (match.data.participants[t].stats.kills +
          match.data.participants[t].stats.assists) /
          match.data.participants[t].stats.deaths
    }
    secondCounter++
  }

  if (calcKDA > enemyCalcKDA && enemyCalcKDA !== undefined) {
    winOpp++
  } else if (enemyCalcKDA !== undefined && calcKDA < enemyCalcKDA) {
    loseOpp++
  }

  return new PlayerData(
    {kda,
    calcKDA,
    enemyKDA,
    enemyCalcKDA,
    winOpp,
    loseOpp}
  );
}

const findGame = () => {};

module.exports = { findGame, handleGames }
