const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  
  username: {
    type: String,
    requried: true
  },

  email: {
    type: String,
    requried: true
  },

  password: {
    type: String,
    required: true
  },

  imgAvatar: {
    type: String
  },

  role: {
    type: String,
    default: "Member"
  },

  posts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
    }

  ]
});

module.exports = mongoose.model("User", userSchema);