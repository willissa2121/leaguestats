const db = require("../models");

const aggregateStats = () => {

  db.classic_stats.findAll({
    attributes: {
      include: [
        [db.sequelize.fn("COUNT", db.sequelize.col("kills")), "columnCount"],
      ]
    }
  }).then(data => {
    const { columnCount } = data[0].dataValues;
    db.all_stats.findAll({
      attributes: {
        include: [
          [db.sequelize.fn("SUM", db.sequelize.col("kills")), "killSum"],
          // [db.sequelize.fn("SUM", db.sequelize.col("deaths"), "deathSum")],
          // [db.sequelize.fn("SUM", db.sequelize.col("assists"), "assistSum")],
          // [db.sequelize.fn("SUM", db.sequelize.col("eKills"), "eKillSum")],
          // [db.sequelize.fn("SUM", db.sequelize.col("eDeaths"), "eDeathSum")],
          // [db.sequelize.fn("SUM", db.sequelize.col("eAssists"), "eAssistSum")],
          // [db.sequelize.fn("SUM", db.sequelize.col("goldEarned"), "goldEarnedSum")],
        ]
      }
    }).then(Data => {
      const { killSum, deathSum, assistSum, eDeathSum, eKillSum, eAssistSum, goldEarnedSum } = Data[0].dataValues
      console.log(Data[0].dataValues)
    })
  });
};

//aggregateStats();

module.exports = { aggregateStats };
