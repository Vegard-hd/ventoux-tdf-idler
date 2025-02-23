module.exports = (sequelize, Sequelize) => {
  const user = sequelize.define(
    "user",
    {
      fist_name: Sequelize.DataTypes.STRING,
      last_name: Sequelize.DataTypes.STRING,
      username: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      encrypted_password: {
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
    user.belongsToMany(models.upgrades, { through: models.upgrades_junction });
    // user.belongsToMany(models.Room, { through: models.Reservation });
  };
  return user;
};
