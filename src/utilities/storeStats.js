const db = require('../models');

const storeStats = (userSummoner, allSummoner, gameID, onlyOnce, accountID) => {
  const {
    goldEarned, kills, deaths, assists,
  } = userSummoner.stats;
  const champDamage = userSummoner.stats.totalDamageDealtToChampions;
  let eKills;
  let eDeaths;
  let eAssists;
  let eGoldEarned;
  let eChampDamage;
  allSummoner.map((player) => {
    if (
      player.timeline.lane === userSummoner.timeline.lane
      && onlyOnce
      && player.participantId !== userSummoner.participantId
    ) {
      onlyOnce = false;
      eKills = player.stats.kills;
      eDeaths = player.stats.deaths;
      eAssists = player.stats.assists;
      eGoldEarned = player.stats.goldEarned;
      eChampDamage = player.stats.totalDamageDealtToChampions;
    }
  });

  db.BASIC_STATS.findOrCreate({
    where: { gameID },
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
    },
  }).spread((user, create) => {
    user.get({
      plain: true,
    });

    console.log(create);
  });
};

module.exports = { storeStats };
