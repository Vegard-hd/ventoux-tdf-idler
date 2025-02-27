module.exports = (sequelize, Sequelize) => {
  const upgrades = sequelize.define(
    "upgrades",
    {
      upgradename: Sequelize.DataTypes.STRING,
      upgradecost: Sequelize.DataTypes.INTEGER,
      upgradedescription: Sequelize.DataTypes.STRING,
      attributes: Sequelize.DataTypes.JSON,
    },
    {
      timestamps: false,
    },
  );
  upgrades.associate = function (models) {
    //setup associations for user here
    upgrades.belongsToMany(models.user, { through: models.upgrades_junction });
  };
  return upgrades;
};
