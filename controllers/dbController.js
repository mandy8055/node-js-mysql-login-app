const mysql = require("mysql");
const dotenv = require("dotenv");
dotenv.config({ path: "./.env" });

const db = mysql.createPool({
  connectionLimit: process.env.CONNECTION_LIMIT,
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE,
  port: process.env.DB_PORT,
}); // Recreate the connection, since
// the old one cannot be reused.

// db.connect((error) => {
//   if (error) {
//     console.log(error);
//   } else {
//     console.log("MYSQL Connected...");
//   }
// });

module.exports = db;
