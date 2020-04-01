module.exports = (sequelize, DataTypes) => {
  var basic = sequelize.define(
    "classic_stats",
    {
      accountID: { type: DataTypes.STRING, allowNull: false },
      kills: { type: DataTypes.INTEGER, allowNull: false },
      deaths: { type: DataTypes.INTEGER, allowNull: false },
      assists: { type: DataTypes.INTEGER, allowNull: false },
      eKills: { type: DataTypes.INTEGER, allowNull: false },
      eDeaths: { type: DataTypes.INTEGER, allowNull: false },
      eAssists: { type: DataTypes.INTEGER, allowNull: false },
      goldEarned: { type: DataTypes.INTEGER, allowNull: false },
      eGoldEarned: { type: DataTypes.INTEGER, allowNull: false },
      champDamage: { type: DataTypes.INTEGER, allowNull: false },
      eChampDamage: { type: DataTypes.INTEGER, allowNull: false },
      gameId: { type: DataTypes.BIGINT, allowNull: false }
    },
    {
      freezeTableName: true
    }
  );

  return basic;
};
