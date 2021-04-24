const throng = require("throng");

const WORKERS = process.env.WEB_CONCURRENCY || 1;
const PORT = process.env.PORT;
throng(
  {
    workers: WORKERS,
    lifetime: Infinity,
  },
  start
);
function start() {
  const express = require("express");
  const path = require("path");
  const cookieParser = require("cookie-parser");
  const publicDirectory = path.join(__dirname, "./public");

  const app = express();
  app.use(express.static(publicDirectory));

  // For parsing url-encoded bodies as sent by HTML forms
  app.use(express.urlencoded({ extended: false }));
  // Parse JSON bodies(as sent by the API)
  app.use(express.json());

  app.use(cookieParser());

  app.set("view engine", "hbs");

  // Define routes
  app.use("/", require("./routes/pages"));
  app.use("/auth", require("./routes/auth"));

  app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
  });
}
