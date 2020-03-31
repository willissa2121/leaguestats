module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define(
    "User",
    {
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING
    },
    {
      freezeTableName: true
    }
  );

  return User;
};
