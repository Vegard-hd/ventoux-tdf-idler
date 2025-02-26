var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
var logger = require("morgan");

const { randomUUID } = require("crypto");
var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");

//database setup with sync
const db = require("./models");
db.sequelize.sync({ force: true });

var app = express();

// create session for users playing as "guest"
const session = require("express-session");
const MemoryStore = require("memorystore")(session);

app.use(
  session({
    cookie: { maxAge: 86400000 },
    store: new MemoryStore({
      checkPeriod: 86400000, // prune expired entries every 24h
    }),
    resave: false,
    secret: "keyboard cat",
    saveUninitialized: true,
  }),
);

app.use(async function (req, res, next) {
  if (!req.session.userId) {
    req.session.userId = randomUUID();
  }
  if (!req.session.score) {
    req.session.score = 0;
  }
  next();
});

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));

app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(bodyParser.json()); // for parsing application/json

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
app.use("/", indexRouter);
app.use("/users", usersRouter);

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
