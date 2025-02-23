module.exports = (sequelize, Sequelize) => {
  const upgrades = sequelize.define(
    "upgrades",
    {
      upgrade_name: Sequelize.DataTypes.STRING,
      upgrade_cost: Sequelize.DataTypes.INTEGER,
      upgrade_description: Sequelize.DataTypes.STRING,
      attributes: Sequelize.DataTypes.JSON,
    },
    {
      timestamps: false,
    },
  );
  upgrades.associate = function (models) {
    //setup associations for user here
    upgrades.belongsToMany(models.user, { through: models.upgrades_junction });
    // User.belongsToMany(models.Room, { through: models.Reservation });
  };
  return upgrades;
};
