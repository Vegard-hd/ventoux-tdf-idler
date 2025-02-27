const { QueryTypes } = require("sequelize");
class UserService {
  constructor(db) {
    this.client = db.sequelize;
    this.Guest = db.guest;
    this.Score = db.score;
  }

  async getOne(guestId = " ") {
    return await this.Guest.findOne({
      where: {
        sessionid: guestId,
      },
    }).catch((e) => {
      console.warn(e);
    });
  }

  async createGuest(guestId = "") {
    return await this.Guest.create({
      sessionid: guestId,
    })
      .then(async (data) => {
        await this.Score.create({
          guestId: data?.id,
        });
      })
      .catch((e) => {
        console.warn(e);
      });
  }

  // raw SQL query using replacements

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
}
module.exports = UserService;
