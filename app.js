const express = require("express");
const path = require("path");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const logger = require("./utils/winston-logger");
const app = express();
const compression = require("compression");
const helmet = require("helmet");
dotenv.config({ path: "./.env" });
const PORT = process.env.PORT;

// global variable
global.logLevel = process.env.LOG_LEVEL;

if (app.get("env") === "development") {
  // error handlers
  // development error handler
  // will print stacktrace
  app.use(function (err, req, res, next) {
    res.status(err.code || 500).json({
      status: "error",
      message: err,
    });
  });
} else {
  // production error handler
  // no stack-traces leaked to user
  app.use(function (err, req, res, next) {
    res.status(err.status || 500).json({
      status: "error",
      message: err,
    });
  });
}

// Make use static images, css required in the web application.
const publicDirectory = path.join(__dirname, "./public");
app.use(express.static(publicDirectory));
// Compressing requests and responses
app.use(compression());
// Securing the application
app.use(helmet());
// Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded({ extended: false }));
// Parse JSON bodies (as sent by API clients)
app.use(express.json());
app.use(cookieParser());
// Setting up the view engine
app.set("view engine", "hbs");
//Define Routes
app.use("/", require("./routes/pages"));
app.use("/auth", require("./routes/auth"));
// Basic checking whether the app is working properly.
app.listen(PORT, () => {
  logger.winston.info(`Server started on Port ${PORT}`);
});
