module.exports = (sequelize, Sequelize) => {
  const upgrades_junction = sequelize.define(
    "upgrades_junction",
    {},
    {
      timestamps: false,
    },
  );
  upgrades_junction.associate = function (models) {
    //setup associations for user here
    // User.belongsToMany(models.Hotel, { through: models.Rate });
    // User.belongsToMany(models.Room, { through: models.Reservation });
  };
  return upgrades_junction;
};
