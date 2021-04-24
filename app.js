const express = require("express");
const path = require("path");
const mysql = require("mysql");
const dotenv = require("dotenv");

dotenv.config({
  path: "./.env",
});

const publicDirectory = path.join(__dirname, "./public");

const app = express();

const db = mysql.createConnection({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE,
});

db.connect((err) => {
  if (err) console.log(err);
  else console.log("MySQL connected...");
});

app.use(express.static(publicDirectory));

app.set("view engine", "hbs");

app.get("/", (req, res) => {
  //   res.send("<h1>HELLO WORLD</h1>");
  res.render("index");
});

app.listen(5001, () => {
  console.log("Server started:");
});
