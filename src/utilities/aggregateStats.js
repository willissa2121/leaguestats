const db = require("../models");
const config = require("../config/config");

const aggregateStats = id => {
  const fullDataObject = {};
  fullDataObject.checkWinner = {
    kda: 0,
    gold: 0,
    damage: 0
  };
  return new Promise(res => {
    db.classic_stats.findAll({ where: { accountId: id } }).then(data => {
      // console.log(data[0].dataValues);
      data.map(value => {
        // console.log(value.dataValues);
        const {
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
        } = value.dataValues;
        const kda = ((kills + assists) / deaths).toFixed(2);
        const eKda = ((eKills + eAssists) / eDeaths).toFixed(2);
        fullDataObject.checkWinner.kda =
          kda > eKda
            ? (fullDataObject.checkWinner.kda += 1)
            : (fullDataObject.checkWinner.kda += 0);
        fullDataObject.checkWinner.gold =
          goldEarned > eGoldEarned
            ? (fullDataObject.checkWinner.gold += 1)
            : (fullDataObject.checkWinner.gold += 0);

        fullDataObject.checkWinner.damage =
          champDamage > eChampDamage
            ? (fullDataObject.checkWinner.damage += 1)
            : (fullDataObject.checkWinner.damage += 0);
      });
      // console.log(fullDataObject)

      // const dataObj = dataPack.data;
      // const arrayOfKeys = Object.keys(dataObj);
      const sumOfFieldsObj = {};

      config.valueArray.map((key, iteration) => {
        db.classic_stats
          .findAll({
            attributes: {
              include: [
                [
                  db.sequelize.fn("SUM", db.sequelize.col(`${key}`)),
                  `${key}Sum`
                ],
                [
                  db.sequelize.fn("COUNT", db.sequelize.col(`${key}`)),
                  `totalCount`
                ]
              ]
            }
          })
          .then(Data => {
            sumOfFieldsObj[`${key}Sum`] = Data[0].dataValues[`${key}Sum`];
            if (iteration === config.valueArray.length - 1) {
              sumOfFieldsObj.count = Data[0].dataValues.totalCount;
              const averagesObject = parseSums(sumOfFieldsObj);
              fullDataObject.average = averagesObject;
              res(fullDataObject);
            }
          });
      });
    });
  });
};

const parseSums = dataPack => {
  const averagesObject = {};
  const arrayOfKeys = Object.keys(dataPack);
  arrayOfKeys.map(key => {
    if (key === 'count') {
      averagesObject[`${key}Avg`] = dataPack[key].toFixed(2);
    } else {
      averagesObject[`${key}Avg`] = (dataPack[key] / dataPack.count).toFixed(2);
    }
  });
  return averagesObject;
};

module.exports = { aggregateStats };
