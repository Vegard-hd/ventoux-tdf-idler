var express = require("express");
const { setInterval } = require("node:timers");
var router = express.Router();
const db = require("../models");
const GuestService = require("../services/GuestService");
const guestService = new GuestService(db);
const ScoreService = require("../services/ScoreService");
const scoreService = new ScoreService(db);
// router.use(async function (req, res, next) {
//   const startTime = Date.now();
//   setInterval(() => {
//     let currentTime = Date.now();
//     console.log("this should ");
//     console.log(currentTime - startTime);
//   }, 1000);
//   next();
// });

// initialize new guest user with scores relation
router.get("/guests", async function (req, res, next) {
  if (!req.session.userId) {
    try {
      const { randomUUID } = await import("node:crypto");
      let generatedId = randomUUID();
      req.session.userId = generatedId;
      const data = await guestService.createGuest(generatedId);
      console.log(data);
      // await scoreService.createRow(data?.id);
    } catch (error) {
      console.warn(error);
      return res.redirect("/");
    }
  }
  res.redirect("/");
});

router.get("/", function (req, res, next) {
  console.log(req.session);
  res.render("index", { title: "Express" });
});

module.exports = router;
