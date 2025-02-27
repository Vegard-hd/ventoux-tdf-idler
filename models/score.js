module.exports = (sequelize, Sequelize) => {
  const score = sequelize.define(
    "score",
    {
      score: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false,
        unique: false,
        defaultValue: 0,
      },
      totalscore: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false,
        unique: false,
        defaultValue: 0,
      },
      currentdistance: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false,
        unique: false,
        defaultValue: 0,
      },
      totaldistance: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false,
        unique: false,
        defaultValue: 0,
      },
      completedruns: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false,
        unique: false,
        defaultValue: 0,
      },
    },
    {
      timestamps: false,
    },
  );
  score.associate = function (models) {
    //setup associations for user here
    score.belongsTo(models.user);
    score.belongsTo(models.guest);
  };
  return score;
};
