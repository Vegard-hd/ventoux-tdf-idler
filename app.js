var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
// const bodyParser = require("body-parser");
var logger = require("morgan");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
const gameRouter = require("./routes/game");

//database setup with sync
const db = require("./models");
db.sequelize.sync({ force: false });

var app = express();

// create session for users playing as "guest"
const session = require("express-session");
const MemoryStore = require("memorystore")(session);

app.use(
  session({
    cookie: { maxAge: 86400000 },
    store: new MemoryStore({
      checkPeriod: 86400000 * 365, // prune expired entries every 24h
    }),
    resave: false,
    secret: process.env.COOKIE_SECRET,
    saveUninitialized: true,
  }),
);

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
// app.use(bodyParser.json()); // for parsing application/json

app.use(cookieParser());

// public files and node modules
app.use(express.static(path.join(__dirname, "public")));
app.use(
  "/js",
  express.static(path.join(__dirname, "./node_modules/bootstrap/dist/js/")),
);
app.use(
  "/css",
  express.static(path.join(__dirname, "./node_modules/bootstrap/dist/css/")),
);

// router endpoint binding
app.use("/users", usersRouter);
app.use("/", indexRouter);
app.use("/game", gameRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};
  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
