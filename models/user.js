module.exports = (sequelize, Sequelize) => {
  const user = sequelize.define(
    "user",
    {
      fistname: Sequelize.DataTypes.STRING,
      lastname: Sequelize.DataTypes.STRING,
      username: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      encryptedpassword: {
        type: Sequelize.DataTypes.BLOB,
        allowNull: false,
      },
      salt: {
        type: Sequelize.DataTypes.BLOB,
        allowNull: false,
      },
    },
    {
      timestamps: false,
    },
  );
  user.associate = function (models) {
    //setup associations for user here
    user.hasOne(models.score);
    user.belongsTo(models.guest);
    user.belongsToMany(models.upgrades, { through: models.upgrades_junction });
  };
  return user;
};
