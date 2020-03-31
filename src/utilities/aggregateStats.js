const db = require("../models");

const aggregateStats = () => {
  db.BASIC_STATS.count('kills').then(count=>{
    db.BASIC_STATS.sum("kills").then(total=>{
      const avgKills = (total/count).toFixed(2)
      console.log(avgKills)
    })
  })
   
};

module.exports = { aggregateStats };
