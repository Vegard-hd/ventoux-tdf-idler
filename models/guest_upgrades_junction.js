module.exports = (sequelize, Sequelize) => {
  const guest_upgrades_junction = sequelize.define(
    "guest_upgrades_junction",
    {}, //todo add int that is userid + upgradeid to make it unique to prevent duplicates
    {
      timestamps: false,
    },
  );
  return guest_upgrades_junction;
};
