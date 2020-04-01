const db = require("../models");

const aggregateStats = () => {

  db.BASIC_STATS.count("eGoldEarned").then(Data=>{console.log(Data)})
  db.BASIC_STATS.findAll({
    attributes: {
      include: [
        [db.sequelize.fn("COUNT", db.sequelize.col("kills")), "tot_kills"],
        [db.sequelize.fn("COUNT", db.sequelize.col("deaths")), "tot_deaths"],
        [db.sequelize.fn("COUNT", db.sequelize.col("assists")), "tot_assists"]
      ]
    }
  }).then(data => {
    //console.log(data[0].dataValues);
    // const { tot_kills, tot_deaths, tot_assists } = data[0].dataValues;
    // console.log(tot_kills, tot_deaths, tot_assists);
  });
};

//aggregateStats();

module.exports = { aggregateStats };
