const { QueryTypes } = require("sequelize");
const { Op } = require("sequelize");
class UserService {
  constructor(db) {
    this.client = db.sequelize;
    this.User = db.user;
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

  async create(
    firstName = "",
    lastName = "",
    username = "",
    salt,
    encryptedPassword,
  ) {
    return await this.User.create({
      FirstName: firstName,
      LastName: lastName,
      Username: username,
      Salt: salt,
      EncryptedPassword: encryptedPassword,
    }).catch((e) => console.warn(e));
  }

  async getAll() {
    return await this.User.findAll({
      where: {},
    }).catch((e) => console.warn(e));
  }

  async getArrOfId() {
    return await this.User.findAll({
      attributes: ["id"],
    }).catch((e) => console.warn(e));
  }

  /* Deletes a user that has Role NOT "Admin" */
  async deleteUser(userId) {
    return await this.User.destroy({
      where: {
        id: userId,
        Role: {
          [Op.not]: "Admin",
        },
      },
    }).catch((e) => console.warn(e));
  }
}
module.exports = UserService;
