const router = require("express").Router();
const { check, validationResult } = require("express-validator");
const config = require("config");
const passport = require("passport");
const passportConfig = require("../utils/passport");
const JWT = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const User = require("../models/User");

const signToken = userId => {
  return JWT.sign({
    iss: "Brunnic",
    sub: userId
  }, config.get("secret"), { expiresIn: "1h" })
}

/*
ADRESS /api/auth/new
METHOD POST
DESC Create new user
*/

router.post("/auth/register", [
  check("username", "Username should not be empty").notEmpty(),
  check("email", "Please enter a valid email adress").isEmail(),
  check("password", "Password should be atleast 6 characters").isLength({ min: 6 })
], (req, res, next) => {
  const errors = validationResult(req);

  // Validation Errors
  if(!errors.isEmpty()) {
    console.log(errors)
    return res.status(400).json({ errors: errors.array()});
  }

  const { username, email, password } = req.body;

  // Check if email is already registered
  User.findOne({ email })
  .then((user) => {
    
    if(user) {
      return res.status(400).json({ msg: "Email already in use, please try another email" });
    }

    // Create new user
    const newUser = new User({
      username,
      email,
      password
    });

    // hash password
    bcrypt.genSalt(10, (err, salt) => {
      if(err) throw err;

      bcrypt.hash(password, salt, (err, hashedPass) => {
        if(err) throw err;

        newUser.password = hashedPass;
        newUser.save(err => {
          if(err) res.status(500).json({ msg: "An error has occured " + err.message, error: true});

          else res.status(201).json({ msg: "User registered succesfully", error: false})
        });
        
      });
    });

  })
  .catch(err => {
    res.status(400).json({ msg: err.message});
    console.log(err.message);
  })
});

/*
ADRESS /api/auth/login
METHOD POST
DESC login
*/

router.post("/auth/login", (req, res, next) => {

  passport.authenticate("local", { session: false }, (err, user, info) => {
    if(err) return res.status(500).json({ error: err });

    if(!user) return res.status(400).json({ error: info });

    req.logIn(user, (err) => {
      if(err) {
        res.status(500).json({ msg: "Internal Error" });
        throw err;
      }

      const { _id, username, email, role } = req.user;
      const token = signToken(_id);
      res.cookie("access-token", token, { httpOnly: true, sameSite: true });
      res.status(200).json({ isAuthenticated: true, user: { username, email, role, _id }});
    });
  })(req, res, next);

  // if(req.isAuthenticated()) {

  // }

  // else {
  //   res.status(400).json({ msg: "Invalid Credentials" });
  // }
});

/*
ADRESS /api/auth/logout
METHOD get
DESC logout
*/

router.get("/auth/logout", passport.authenticate("jwt", { session: false}), (req, res) => {
  res.clearCookie("access-token");
  res.json({ user: { username: "", email: "", role: "", _id: ""}, success: true});
});

/*
ADRESS /api/auth
METHOD get
DESC verify that user is authenticated
*/

router.get("/auth", passport.authenticate("jwt", { session: false }),(req, res) => {
  const { username, email, role, _id } = req.user;
  res.status(200).json({ isAuthenticated: true, user: { username, email, role, _id }});
});

module.exports = router;