module.exports = (sequelize, Sequelize) => {
  const upgrades_junction = sequelize.define(
    "upgrades_junction",
    {}, //todo add int that is userid + upgradeid to make it unique to prevent duplicates
    {
      timestamps: false,
    },
  );
  return upgrades_junction;
};
