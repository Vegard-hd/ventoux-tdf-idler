var express = require("express");
const { setInterval } = require("node:timers");
var router = express.Router();
const db = require("../models");
const ScoreService = require("../services/ScoreService");
const scoreService = new ScoreService(db);
const GuestService = require("../services/GuestService");
const guestService = new GuestService(db);
// router.use(async function (req, res, next) {
//   const startTime = Date.now();
//   setInterval(() => {
//     let currentTime = Date.now();
//     console.log("this should ");
//     console.log(currentTime - startTime);
//   }, 1000);
//   next();
// });

router.get("/", async function (req, res, next) {
  const getGuestId = await guestService.getOne(req.session?.userId);
  console.log(req.session);
  await scoreService.incrementAll(1, getGuestId?.id);
  res.render("index", { title: "Express" });
});

module.exports = router;
