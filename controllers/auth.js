const db = require("./dbController");
const jwt = require("jsonwebtoken");
const bcryptjs = require("bcryptjs");
const { promisify } = require("util");

exports.register = (req, res) => {
  // console.log(req.body);
  const { name, email, password, passwordConfirm } = req.body;
  db.query(
    "SELECT email FROM users WHERE email = ?",
    [email],
    async (error, result) => {
      if (error) console.log(error);
      if (result.length > 0) {
        return res.render("register", {
          message: "Email already registered with us",
        });
      } else if (password !== passwordConfirm) {
        return res.render("register", {
          message: "Passwords do not match",
        });
      }
      let hashedPassword = await bcryptjs.hash(password, 8);
      db.query(
        "INSERT INTO users SET ?",
        {
          name: name,
          email: email,
          password: hashedPassword,
        },
        (error, result) => {
          if (error) console.log(error);
          else {
            // console.log(result);
            return res.render("register", {
              message: "Registration successful",
            });
          }
        }
      );
    }
  );
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      // 400 --> forbidden code
      return res.status(400).render("login", {
        message: "Email and password field cannot be empty.",
      });
    }
  } catch (error) {
    console.log(error);
  }

  db.query(
    "SELECT * FROM users WHERE email = ?",
    [email],
    async (error, results) => {
      // console.log(results);
      if (
        !results ||
        !(await bcryptjs.compare(password, results[0].password))
      ) {
        res.status(401).render("login", {
          message: "Email or password is incorrect.",
        });
      } else {
        const id = results[0].id;
        const token = jwt.sign({ id }, process.env.JWT_SECRET, {
          expiresIn: process.env.JWT_EXPIRES_IN,
        });

        const cookieOptions = {
          expires: new Date(
            Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
          ),
          httpOnly: true,
        };
        res.cookie("loginJwt", token, cookieOptions);
        res.status(200).redirect("/");
      }
    }
  );
};

exports.isLoggedIn = async (req, res, next) => {
  // console.log(req.cookies);

  if (req.cookies.loginJwt) {
    try {
      // Verify the token
      const decoded = await promisify(jwt.verify)(
        req.cookies.loginJwt,
        process.env.JWT_SECRET
      );
      // console.log(decoded);

      // Check if the user still exists
      db.query(
        "SELECT * FROM users WHERE id = ?",
        [decoded.id],
        (err, result) => {
          // console.log(result);
          if (!result) return next();

          req.user = result[0];
          return next();
        }
      );
    } catch (error) {
      return next();
    }
  } else next();
};

exports.logout = async (req, res) => {
  res.cookie("loginJwt", "logout", {
    expires: new Date(Date.now() + 2 * 1000),
    httpOnly: true,
  });

  res.status(200).redirect("/");
};
