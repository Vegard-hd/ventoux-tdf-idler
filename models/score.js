module.exports = (sequelize, Sequelize) => {
  const score = sequelize.define(
    "score",
    {
      score: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false,
        unique: false,
        default: 0,
      },
      total_score: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false,
        unique: false,
        default: 0,
      },
      current_distance: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false,
        unique: false,
        default: 0,
      },
      total_distance: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false,
        unique: false,
        default: 0,
      },
      completed_runs: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false,
        unique: false,
        default: 0,
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
