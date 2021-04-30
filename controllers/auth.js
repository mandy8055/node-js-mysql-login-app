const db = require("./dbController");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { promisify } = require("util");
const logger = require("../utils/winston-logger");

exports.login = async (req, res) => {
  logger.winston.info("[Login User]");
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).render("login", {
        message: "Please provide an email and password",
      });
    }

    db.query(
      "SELECT * FROM userss WHERE email = ?",
      [email],
      async (error, results) => {
        // console.log(`Result of query ${results}`);
        if (
          !results ||
          results.length === 0 ||
          !(await bcrypt.compare(password, results[0].password))
        ) {
          res.status(401).render("login", {
            message: "Email or Password is incorrect",
          });
        } else {
          const id = results[0].id;

          const token = jwt.sign({ id }, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRES_IN,
          });

          console.log("The token is: " + token);

          const cookieOptions = {
            expires: new Date(
              Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000
            ),
            httpOnly: true,
          };

          res.cookie("jwt", token, cookieOptions);
          res.status(200).redirect("/");
        }
      }
    );
  } catch (error) {
    logger.winston.error(error);
  }
};

exports.register = (req, res) => {
  logger.winston.info("[Register User]");
  // console.log(req.body);

  const { name, email, password, passwordConfirm } = req.body;

  db.query(
    "SELECT email FROM userss WHERE email = ?",
    [email],
    async (error, results) => {
      if (error) {
        logger.winston.error(error);
      }

      if (results.length > 0) {
        return res.render("register", {
          message: "That email is already in use",
        });
      } else if (password !== passwordConfirm) {
        return res.render("register", {
          message: "Passwords do not match",
        });
      }

      let hashedPassword = await bcrypt.hash(password, 8);
      console.log(`Hashed Password: ${hashedPassword}`);

      db.query(
        "INSERT INTO userss SET ?",
        { name: name, email: email, password: hashedPassword },
        (error, results) => {
          if (error) {
            logger.winston.error(error);
          } else {
            logger.winston.info(`Results: ${results}`);
            return res.render("register", {
              message: "User registered",
            });
          }
        }
      );
    }
  );
};

exports.isLoggedIn = async (req, res, next) => {
  logger.winston.info("[IsLoggedIn]");
  console.log(req.cookies);
  if (req.cookies.jwt) {
    try {
      //1) verify the token
      const decoded = await promisify(jwt.verify)(
        req.cookies.jwt,
        process.env.JWT_SECRET
      );

      // console.log(`Decoded value: ${decoded}`);

      //2) Check if the user still exists
      db.query(
        "SELECT * FROM userss WHERE id = ?",
        [decoded.id],
        (error, result) => {
          // console.log(result);

          if (!result) {
            return next();
          }

          req.user = result[0];
          // console.log("user is");
          // console.log(`Current user: ${req.user}`);
          return next();
        }
      );
    } catch (error) {
      logger.winston.error(error);
      return next();
    }
  } else {
    next();
  }
};

exports.logout = async (req, res) => {
  logger.winston.info("[Logout]");
  res.clearCookie("jwt", {
    expires: new Date(Date.now() + 2 * 1000),
    httpOnly: true,
  });

  res.status(200).redirect("/");
};
