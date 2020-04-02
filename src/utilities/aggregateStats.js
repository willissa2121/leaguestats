const db = require("../models");

const aggregateStats = id => {
  return new Promise(res => {
    console.log("checkin ghere");
    db.classic_stats.findAll({ where: { accountId: id } }).then(data => {
      // console.log(data[0].dataValues);
      data.map(value => {
        console.log(value.dataValues);
      });
      res(data);
    });
  });
  // return new Promise(res => {
  //   const dataObj = dataPack.data;
  //   const arrayOfKeys = Object.keys(dataObj);
  //   const sumOfFieldsObj = {};

  //   arrayOfKeys.map((key, iteration) => {
  //     db.classic_stats
  //       .findAll({
  //         attributes: {
  //           include: [
  //             [db.sequelize.fn("SUM", db.sequelize.col(`${key}`)), `${key}Sum`],
  //             [
  //               db.sequelize.fn("COUNT", db.sequelize.col(`${key}`)),
  //               `totalCount`
  //             ]
  //           ]
  //         }
  //       })
  //       .then(Data => {
  //         sumOfFieldsObj[`${key}Sum`] = Data[0].dataValues[`${key}Sum`];
  //         if (iteration === arrayOfKeys.length - 1) {
  //           sumOfFieldsObj.count = Data[0].dataValues.totalCount;
  //           res(parseSums(sumOfFieldsObj));
  //         }
  //       });
  //   });
  // });
};

const parseSums = dataPack => {
  const averagesObject = {};
  const arrayOfKeys = Object.keys(dataPack);
  arrayOfKeys.map(key => {
    averagesObject[`${key}Avg`] = (dataPack[key] / dataPack.count).toFixed(2);
  });
  return averagesObject;
};

module.exports = { aggregateStats };
