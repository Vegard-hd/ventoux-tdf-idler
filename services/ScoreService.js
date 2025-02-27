const { QueryTypes } = require("sequelize");
const { Op } = require("sequelize");
class UserService {
  constructor(db) {
    this.client = db.sequelize;
    this.Score = db.score;
  }

  // raw SQL query using replacements

  async createRow(userId = "") {
    return await this.Score.create({
      userid: userId,
    });
  }
  async rawQuery(name = "", password = "") {
    return await this.client
      .query(
        `
    SELECT name AS n WHERE n.password = :password AND n.name = :name`,
        {
          replacements: { password: password, name: name },
          type: QueryTypes.SELECT,
          plain: true,
        },
      )
      .catch((e) => console.warn(e));
  }
  async incrementAll(value = 1, userId = "") {
    return await this.Score.increment(
      ["score", "totalscore", "currentdistance", "totaldistance"],
      {
        by: value,
        where: {
          [Op.or]: [{ userid: userId }, { guestid: userId }],
        },
      },
    );
  }
}

module.exports = UserService;
