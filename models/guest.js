module.exports = (sequelize, Sequelize) => {
  const guest = sequelize.define(
    "guest",
    {
      sessionid: {
        type: Sequelize.DataTypes.STRING,
        unique: true,
      },
    },
    {
      timestamps: true,
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
