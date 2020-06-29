const mongoose = require("mongoose");
const dbAdress = require("config").get("dbAdress");

module.exports = () => {
  mongoose.connect(dbAdress, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  })
  .then(() => console.log("Database Configured Correctly"))
  .catch((err) => console.error(err.message));
}