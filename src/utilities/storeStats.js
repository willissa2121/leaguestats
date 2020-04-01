const db = require("../models");
const { aggregateStats } = require("./aggregateStats");
const config = require('../config/config')

const storeStats = (userSummoner, matchData, onlyOnce, accountID, iteration) => {
  const { goldEarned, kills, deaths, assists } = userSummoner.stats;
  const { gameMode, gameId } = matchData;
  const champDamage = userSummoner.stats.totalDamageDealtToChampions;
  let eKills;
  let eDeaths;
  let eAssists;
  let eGoldEarned;
  let eChampDamage;

  matchData.participants.map(player => {
    if (
      player.timeline.lane === userSummoner.timeline.lane &&
      onlyOnce &&
      player.participantId !== userSummoner.participantId
    ) {
      onlyOnce = false;
      eKills = player.stats.kills;
      eDeaths = player.stats.deaths;
      eAssists = player.stats.assists;
      eGoldEarned = player.stats.goldEarned;
      eChampDamage = player.stats.totalDamageDealtToChampions;
    }
  });
  if (gameMode === "CLASSIC") {
    db.classic_stats
      .findOrCreate({
        where: { gameId },
        defaults: {
          accountID,
          kills,
          deaths,
          assists,
          eKills,
          eDeaths,
          eAssists,
          goldEarned,
          eGoldEarned,
          champDamage,
          eChampDamage
        }
      })
      .spread((user, create) => {
        user.get({
          plain: true
        });


        //console.log(create);
      })
      .catch(e => {
        console.error(e);
      });
  }
  db.all_stats
    .findOrCreate({
      where: { gameId },
      defaults: {
        accountID,
        kills,
        deaths,
        assists,
        eKills,
        eDeaths,
        eAssists,
        goldEarned,
        eGoldEarned,
        champDamage,
        eChampDamage,
        gameMode
      }
    })
    .spread((user, create) => {
      user.get({
        plain: true
      });
      if (iteration === config.rateLimit) {
        aggregateStats();
      }

      //console.log(create);
    })
    .catch(e => {
      console.error(e);
    });

};

module.exports = { storeStats };
