const express = require("express");
const config = require("config");
const passport = require("passport");
const cookieParser = require("cookie-parser");

// DATABASE START AND CONFIG
const dbConfig = require("./config/db.js");
dbConfig();

const app = express();

// MIDDLEWARES
app.use(express.json());
app.use(cookieParser());

// // Passport

app.use(passport.initialize());
// app.use(passport.session());

const PORT = process.env.PORT || 5000;

// ROUTERS
app.use("/api", require("./api/posts"));
app.use("/api", require("./api/auth"));

app.get("/", (req, res) => {
  res.send("API WORKING");
});
app.listen(PORT, () => console.log(`Server started at port ${5000}`));