module.exports = (sequelize, DataTypes) => {
  var basic = sequelize.define(
    "BASIC_STATS",
    {
      accountID: DataTypes.STRING,
      kills: DataTypes.INTEGER,
      deaths: DataTypes.INTEGER,
      assists: DataTypes.INTEGER,
      eKills: DataTypes.INTEGER,
      eDeaths: DataTypes.INTEGER,
      eAssists: DataTypes.INTEGER,
      goldEarned: DataTypes.INTEGER,
      eGoldEarned: DataTypes.INTEGER,
      champDamage: DataTypes.INTEGER,
      eChampDamage: DataTypes.INTEGER,
      gameID: DataTypes.BIGINT
    },
    {
      freezeTableName: true
    }
  );

  return basic;
};
