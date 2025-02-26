module.exports = (sequelize, Sequelize) => {
  const guest = sequelize.define(
    "guest",
    {
      session_id: Sequelize.DataTypes.STRING,
    },
    {
      timestamps: false,
    },
  );
  guest.associate = function (models) {
    guest.hasOne(models.user);
    guest.hasOne(models.score);
    guest.belongsToMany(models.upgrades, {
      through: models.guest_upgrades_junction,
    });
  };
  return guest;
};
