const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  body: {
    type: String,
    required: true
  },
  img: {
    type: String,
    required: true
  },
  author: {
    type: mongoose.Types.ObjectId, ref: "User"
  }
}, {
  timestamps: true
});

module.exports = mongoose.model("Post", postSchema);